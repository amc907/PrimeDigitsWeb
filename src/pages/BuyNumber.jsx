import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Globe, Clock, Tag } from 'lucide-react'
import { api } from '../lib/api'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import StripePaymentForm from '../components/StripePaymentForm'
import toast from 'react-hot-toast'

const BuyNumber = () => {
  const [step, setStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState(null)
  const navigate = useNavigate()

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

  const handlePaymentSuccess = async () => {
    setIsLoading(true)
    try {
      const result = await api.buyNumber(selectedCountry.code, selectedPlan.duration, selectedPlan.price)
      setPurchaseResult(result)
      toast.success('Number purchased successfully!')
      setStep(4)
      setTimeout(() => {
        navigate('/sms-inbox')
      }, 3000)
    } catch (err) {
      toast.error('Payment succeeded but activation failed. Please contact support.')
      setIsLoading(false)
    }
  }

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
            <Button variant="primary" className="w-full" onClick={() => setStep(4)}>
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && (
          <div className="space-y-4 animate-slide-up">
            {!purchaseResult ? (
              <>
                <h2 className="text-lg font-semibold text-white mb-4">Payment</h2>
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
                  <StripePaymentForm
                    amount={selectedPlan?.price}
                    buttonText={`Pay $${selectedPlan?.price}`}
                    onSuccess={handlePaymentSuccess}
                    onError={(msg) => toast.error(msg)}
                  />
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Payments are processed securely by Stripe. Prime Digits never stores your card details.
                  </p>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center border-green-500/30">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
                <p className="text-gray-400 text-sm mb-6">Your new number is ready to use.</p>
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
                    <span className="text-white font-medium">{purchaseResult.credits}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Expires</span>
                    <span className="text-white font-medium">{new Date(purchaseResult.expires_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Redirecting to SMS Inbox...</p>
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
