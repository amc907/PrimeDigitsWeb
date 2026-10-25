import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, ChevronRight, Globe, Clock, Tag, Loader2, Lock } from 'lucide-react'
import { api } from '../lib/api'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import toast from 'react-hot-toast'
import RefundAgreement from '../components/RefundAgreement'
import { REFUND_POLICY_VERSION, addMonths } from '../data/refundPolicy'

const BuyNumber = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pollTimerRef = useRef(null)

  const [step, setStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentPhase, setPaymentPhase] = useState('idle') // idle | creating | polling | done | error
  const [paymentError, setPaymentError] = useState(null)
  const [purchaseResult, setPurchaseResult] = useState(null)
  const [pollMessage, setPollMessage] = useState('')

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', prefix: '+1' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', prefix: '+1' },
  ]

  const plans = {
    US: [
      { duration: 1, label: '1 Month', price: 3.99, credits: 15, period: 'month' },
      { duration: 3, label: '3 Months', price: 9.99, credits: 15, period: '3 months', recommended: true, savings: '17%' },
      { duration: 6, label: '6 Months', price: 17.99, credits: 15, period: '6 months', savings: '25%' },
      { duration: 12, label: '1 Year', price: 29.99, credits: 15, period: 'year', savings: '37%' },
    ],
    CA: [
      { duration: 1, label: '1 Month', price: 3.99, credits: 15, period: 'month' },
      { duration: 3, label: '3 Months', price: 9.99, credits: 15, period: '3 months', recommended: true, savings: '17%' },
      { duration: 6, label: '6 Months', price: 17.99, credits: 15, period: '6 months', savings: '25%' },
      { duration: 12, label: '1 Year', price: 29.99, credits: 15, period: 'year', savings: '37%' },
    ],

  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setStep(2)
  }

  // When the buyer ticked the no-refund box; sent with the payment as dispute evidence
  const [refundAcceptedAt, setRefundAcceptedAt] = useState(null)

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setRefundAcceptedAt(null)
    setStep(3)
  }

  const handleProceedToPayment = async () => {
    if (!user?.email) {
      toast.error('Please log in to continue')
      return
    }
    if (!refundAcceptedAt) {
      toast.error('Please read and agree to the no-refund policy first')
      return
    }
    setPaymentPhase('creating')
    setPaymentError(null)
    try {
      const returnUrl = `${window.location.origin}/buy`
      const result = await api.createCheckout({
        purpose: 'number',
        amount: selectedPlan.price.toFixed(2),
        currency: 'USD',
        country: selectedCountry.code,
        duration_months: selectedPlan.duration,
        user_email: user.email,
        refund_policy_accepted: true,
        refund_policy_version: REFUND_POLICY_VERSION,
        refund_policy_accepted_at: refundAcceptedAt,
        service_ends_on: addMonths(new Date(), selectedPlan.duration).toISOString().slice(0, 10),
        success_url: `${returnUrl}?checkout=success`,
        cancel_url: `${returnUrl}?checkout=cancelled`,
      })
      if (!result.checkout_url) throw new Error('Could not start checkout')
      // Remember the order so this page can pick up where it left off when Bachs sends the buyer back
      try {
        sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify({
          country: selectedCountry.code,
          duration: selectedPlan.duration,
          startedAt: new Date().toISOString(),
        }))
      } catch {}
      window.location.href = result.checkout_url
    } catch (err) {
      setPaymentError(err.message || 'Failed to start checkout')
      setPaymentPhase('error')
      toast.error(err.message || 'Failed to start checkout')
    }
  }

  // startedAt keeps numbers bought before this checkout from being shown as the new one
  const startPolling = (startedAt) => {
    let attempts = 0
    const maxAttempts = 20 // 20 * 3s = 60 seconds, the Bachs webhook can take a moment
    const since = startedAt ? new Date(startedAt).getTime() - 60 * 1000 : 0

    const poll = async () => {
      attempts++
      try {
        const data = await api.getWebNumbers(user.email)
        const fresh = (data.numbers || []).filter(n => new Date(n.purchased_at || 0).getTime() >= since)
        if (fresh.length > 0) {
          // Get the most recently purchased number
          const newest = fresh.reduce((a, b) =>
            new Date(b.purchased_at || 0) > new Date(a.purchased_at || 0) ? b : a
          )
          setPurchaseResult(newest)
          setPaymentPhase('done')
          toast.success('Your number is ready!')
          return
        }
      } catch (err) {
        console.warn('Poll error:', err)
      }

      if (attempts >= maxAttempts) {
        setPaymentPhase('done')
        setPollMessage('Activation is taking longer than expected. Your number will appear in your SMS Inbox shortly.')
        return
      }

      pollTimerRef.current = setTimeout(poll, 3000)
    }

    pollTimerRef.current = setTimeout(poll, 3000)
  }

  // Bachs sends the buyer back here with ?checkout=success or ?checkout=cancelled
  useEffect(() => {
    const outcome = searchParams.get('checkout')
    if (!outcome || !user?.email) return

    let pending = null
    try {
      pending = JSON.parse(sessionStorage.getItem(PENDING_ORDER_KEY) || 'null')
      sessionStorage.removeItem(PENDING_ORDER_KEY)
    } catch {}
    setSearchParams({}, { replace: true })

    const country = pending && countries.find(c => c.code === pending.country)
    const plan = country && plans[country.code].find(p => p.duration === pending.duration)
    if (country) setSelectedCountry(country)
    if (plan) setSelectedPlan(plan)

    if (outcome === 'success') {
      setStep(4)
      setPaymentPhase('polling')
      setPollMessage('Payment received! Your number is being activated...')
      startPolling(pending?.startedAt)
    } else {
      toast('Checkout cancelled. You have not been charged.')
      if (plan) setStep(3)
    }
  }, [searchParams, user?.email])

  // Cleanup polling timer on unmount
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current)
    }
  }, [])

  const currentPlans = selectedCountry ? plans[selectedCountry.code] || [] : []

  const steps = [
    { num: 1, label: 'Country' },
    { num: 2, label: 'Duration' },
    { num: 3, label: 'Summary' },
    { num: 4, label: 'Payment' },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Get a new number</h1>
          <p className="mt-2 text-gray-400">Three quick steps and it's yours.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s.num ? 'bg-brand-500 text-[#fff]' : 'bg-dark-800 text-gray-500'
              }`}>
                {s.num}
              </div>
              <span className={`ml-2 text-xs hidden sm:block ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-2 ${step > s.num ? 'bg-brand-500' : 'bg-dark-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Country */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-lg font-semibold text-white mb-4">Pick a country</h2>
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="w-full flex items-center justify-between p-4 bg-dark-900 border border-dark-800 rounded-xl hover:border-brand-500/50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <p className="text-white font-medium">{country.name}</p>
                    <p className="text-sm text-gray-400">Prefix {country.prefix}</p>
                    <p className="text-sm text-brand-400">
                      From $3.99/month
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Duration */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Choose how long</h2>
              <button onClick={() => setStep(1)} className="text-sm text-brand-400 hover:text-brand-400">
                Change Country
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-4 p-3 bg-brand-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-brand-400" />
              <span className="text-brand-400 text-sm font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
            </div>
            {currentPlans.map((plan) => (
              <button
                key={plan.duration}
                onClick={() => handlePlanSelect(plan)}
                className={`w-full relative p-5 bg-dark-900 border rounded-xl hover:border-brand-500/50 transition-colors text-left ${
                  plan.recommended ? 'border-brand-500/50' : 'border-dark-800'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-2 right-4 px-2 py-0.5 bg-brand-500 text-[#fff] text-xs font-semibold rounded">
                    Recommended
                  </div>
                )}
                {plan.savings && (
                  <div className="absolute top-3 right-4 flex items-center text-xs text-green-400">
                    <Tag className="w-3 h-3 mr-1" /> Save {plan.savings}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-brand-400" />
                      <span className="text-white font-medium">{plan.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{plan.credits} texts included</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">${plan.price}</p>
                    <p className="text-xs text-gray-400">per {plan.period}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Your order</h2>
              <button onClick={() => setStep(2)} className="text-sm text-brand-400 hover:text-brand-400">
                Change Plan
              </button>
            </div>
            <Card className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-dark-800">
                  <span className="text-gray-400">Country</span>
                  <span className="text-white font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-dark-800">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-medium">{selectedPlan?.label}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-dark-800">
                  <span className="text-gray-400">SMS Credits</span>
                  <span className="text-white font-medium">{selectedPlan?.credits}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-xl font-bold text-brand-400">${selectedPlan?.price}</span>
                </div>
              </div>
            </Card>
            <RefundAgreement
              checked={Boolean(refundAcceptedAt)}
              onChange={(agreed) => setRefundAcceptedAt(agreed ? new Date().toISOString() : null)}
              planLabel={selectedPlan?.label}
              price={selectedPlan?.price}
              expiresOn={selectedPlan && addMonths(new Date(), selectedPlan.duration)}
            />
            <Button
              variant="primary"
              className="w-full"
              onClick={handleProceedToPayment}
              isLoading={paymentPhase === 'creating'}
              disabled={paymentPhase === 'creating' || !refundAcceptedAt}
            >
              {paymentPhase === 'creating' ? 'Opening secure checkout...' : 'I agree, continue to payment'}
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              You'll pay on Bachs's secure checkout page. Prime Digits never sees your card details.
            </p>
            {paymentPhase === 'error' && paymentError && (
              <p className="text-center text-sm text-red-400 mt-2">{paymentError}</p>
            )}
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="space-y-4 animate-slide-up">
            {/* Polling / Activating */}
            {paymentPhase === 'polling' && (
              <Card className="p-8 text-center border-brand-500/20">
                <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Payment received!</h3>
                <p className="text-gray-400 text-sm mb-2">{pollMessage}</p>
                <p className="text-gray-500 text-xs">This usually takes a few seconds...</p>
              </Card>
            )}

            {/* Done - show result */}
            {(paymentPhase === 'done') && (
              <Card className="p-8 text-center border-green-500/30">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {purchaseResult ? 'Your Number is Ready!' : 'Payment Complete'}
                </h3>
                {purchaseResult ? (
                  <>
                    <p className="text-gray-400 text-sm mb-6">Your new number is live and ready for texts.</p>
                    <div className="bg-dark-800 rounded-lg p-4 mb-6 text-left max-w-sm mx-auto">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Number</span>
                        <span className="text-white font-medium">{purchaseResult.phone_number}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Country</span>
                        <span className="text-white font-medium">{getCountryFlag(purchaseResult.country)} {purchaseResult.country}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-400">Credits</span>
                        <span className="text-white font-medium">
                          {purchaseResult.sms_credits?.remaining ?? purchaseResult.sms_credits?.total ?? 15} remaining
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Expires</span>
                        <span className="text-white font-medium">
                          {purchaseResult.expires_at
                            ? new Date(purchaseResult.expires_at).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="primary" onClick={() => navigate('/sms-inbox')}>
                        Go to SMS Inbox
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/my-numbers')}>
                        View My Numbers
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 text-sm mb-6">{pollMessage}</p>
                    <Button variant="primary" onClick={() => navigate('/sms-inbox')}>
                      Check SMS Inbox
                    </Button>
                  </>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const PENDING_ORDER_KEY = 'primedigits_pending_checkout'

const getCountryFlag = (country) => {
  const flags = { US: '🇺🇸', CA: '🇨🇦', USA: '🇺🇸', CANADA: '🇨🇦' }
  return flags[country?.toUpperCase()] || '🌍'
}

export default BuyNumber
