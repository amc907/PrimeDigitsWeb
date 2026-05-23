import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Globe, Clock, Tag, Loader2, CreditCard, Shield, Lock } from 'lucide-react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { api } from '../lib/api'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import toast from 'react-hot-toast'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#f3f4f6',
      fontFamily: '"Inter", sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#6b7280',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
}

const BuyNumber = () => {
  const { user } = useContext(AuthContext)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const pollTimerRef = useRef(null)

  const [step, setStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState(null)
  const [paymentPhase, setPaymentPhase] = useState('idle') // idle | creating | form | confirming | polling | done | error
  const [paymentError, setPaymentError] = useState(null)
  const [purchaseResult, setPurchaseResult] = useState(null)
  const [pollMessage, setPollMessage] = useState('')

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', prefix: '+1' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', prefix: '+1' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', prefix: '+44' },
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
    GB: [
      { duration: 1, label: '1 Month', price: 5.99, credits: 15, period: 'month' },
      { duration: 3, label: '3 Months', price: 14.99, credits: 15, period: '3 months', recommended: true, savings: '17%' },
      { duration: 6, label: '6 Months', price: 23.99, credits: 15, period: '6 months', savings: '33%' },
      { duration: 12, label: '1 Year', price: 39.99, credits: 15, period: 'year', savings: '44%' },
    ],
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setStep(2)
  }

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    setStep(3)
  }

  const handleProceedToPayment = async () => {
    if (!user?.email) {
      toast.error('Please log in to continue')
      return
    }
    setPaymentPhase('creating')
    setPaymentError(null)
    try {
      const priceInCents = Math.round(selectedPlan.price * 100)
      const result = await api.createPaymentIntent({
        amount: priceInCents,
        currency: 'usd',
        country: selectedCountry.code,
        duration_months: selectedPlan.duration,
        user_email: user.email,
      })
      setClientSecret(result.client_secret)
      setPaymentPhase('form')
      setStep(4)
    } catch (err) {
      setPaymentError(err.message || 'Failed to initialize payment')
      setPaymentPhase('error')
      toast.error(err.message || 'Failed to initialize payment')
    }
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret) return

    setPaymentPhase('confirming')
    setPaymentError(null)

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user?.email || '',
        },
      },
    })

    if (error) {
      setPaymentError(error.message)
      setPaymentPhase('form')
      toast.error(error.message)
      return
    }

    if (paymentIntent.status === 'succeeded') {
      setPaymentPhase('polling')
      setPollMessage('Payment successful! Your number is being activated...')
      toast.success('Payment successful!')
      startPolling()
    } else {
      setPaymentError('Payment was not completed. Please try again.')
      setPaymentPhase('form')
    }
  }

  const startPolling = () => {
    let attempts = 0
    const maxAttempts = 10 // 10 * 3s = 30 seconds

    const poll = async () => {
      attempts++
      try {
        const data = await api.getWebNumbers(user.email)
        if (data.numbers && data.numbers.length > 0) {
          // Get the most recently purchased number
          const newest = data.numbers.reduce((a, b) =>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Buy Virtual Number</h1>
          <p className="mt-2 text-gray-400">Follow the steps below to get your number</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s.num ? 'bg-gold-500 text-white' : 'bg-dark-800 text-gray-500'
              }`}>
                {s.num}
              </div>
              <span className={`ml-2 text-xs hidden sm:block ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-2 ${step > s.num ? 'bg-gold-500' : 'bg-dark-800'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Country */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-lg font-semibold text-white mb-4">Select a Country</h2>
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="w-full flex items-center justify-between p-4 bg-dark-900 border border-dark-800 rounded-xl hover:border-gold-500/50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <p className="text-white font-medium">{country.name}</p>
                    <p className="text-sm text-gray-400">Prefix {country.prefix}</p>
                    <p className="text-sm text-gold-500">
                      From ${country.code === 'GB' ? '5.99' : '3.99'}/month
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
              <h2 className="text-lg font-semibold text-white">Choose Duration</h2>
              <button onClick={() => setStep(1)} className="text-sm text-gold-500 hover:text-gold-400">
                Change Country
              </button>
            </div>
            <div className="flex items-center space-x-2 mb-4 p-3 bg-gold-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-gold-500" />
              <span className="text-gold-400 text-sm font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
            </div>
            {currentPlans.map((plan) => (
              <button
                key={plan.duration}
                onClick={() => handlePlanSelect(plan)}
                className={`w-full relative p-5 bg-dark-900 border rounded-xl hover:border-gold-500/50 transition-colors text-left ${
                  plan.recommended ? 'border-gold-500/50' : 'border-dark-800'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-2 right-4 px-2 py-0.5 bg-gold-500 text-white text-xs font-semibold rounded">
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
                      <Clock className="w-5 h-5 text-gold-500" />
                      <span className="text-white font-medium">{plan.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{plan.credits} SMS credits included</p>
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
              <h2 className="text-lg font-semibold text-white">Order Summary</h2>
              <button onClick={() => setStep(2)} className="text-sm text-gold-500 hover:text-gold-400">
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
                  <span className="text-xl font-bold text-gold-500">${selectedPlan?.price}</span>
                </div>
              </div>
            </Card>
            <Button
              variant="primary"
              className="w-full"
              onClick={handleProceedToPayment}
              isLoading={paymentPhase === 'creating'}
              disabled={paymentPhase === 'creating'}
            >
              {paymentPhase === 'creating' ? 'Initializing...' : 'Proceed to Payment'}
            </Button>
            {paymentPhase === 'error' && paymentError && (
              <p className="text-center text-sm text-red-400 mt-2">{paymentError}</p>
            )}
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="space-y-4 animate-slide-up">
            {/* Payment Form */}
            {(paymentPhase === 'form' || paymentPhase === 'confirming') && (
              <>
                <h2 className="text-lg font-semibold text-white mb-4">Secure Payment</h2>
                <Card className="p-6">
                  <div className="bg-dark-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-white font-medium">${selectedPlan?.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-400">Plan</span>
                      <span className="text-white font-medium">{selectedPlan?.label} — {selectedCountry?.name}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Details
                      </label>
                      <div className="p-3 bg-dark-950 border border-dark-700 rounded-lg">
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                      </div>
                      {paymentError && paymentPhase === 'form' && (
                        <p className="mt-2 text-sm text-red-400">{paymentError}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      <span>SSL Secured — Your card details are encrypted</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <Shield className="w-3 h-3" />
                      <span>Powered by Stripe</span>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      isLoading={paymentPhase === 'confirming'}
                      disabled={!stripe || paymentPhase === 'confirming'}
                    >
                      {paymentPhase === 'confirming' ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Pay ${selectedPlan?.price}
                        </span>
                      )}
                    </Button>
                  </form>

                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Payments are processed securely by Stripe. Prime Digits never stores your card details.
                  </p>
                </Card>
              </>
            )}

            {/* Polling / Activating */}
            {paymentPhase === 'polling' && (
              <Card className="p-8 text-center border-gold-500/20">
                <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
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
                    <p className="text-gray-400 text-sm mb-6">Your new virtual number has been activated.</p>
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

const getCountryFlag = (country) => {
  const flags = { US: '🇺🇸', CA: '🇨🇦', GB: '🇬🇧', USA: '🇺🇸', CANADA: '🇨🇦', UK: '🇬🇧' }
  return flags[country?.toUpperCase()] || '🌍'
}

export default BuyNumber
