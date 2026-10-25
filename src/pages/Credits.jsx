import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CreditCard, Check, Zap, Tag, ChevronDown, Plus, Lock } from 'lucide-react'
import { api } from '../lib/api'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const Credits = () => {
  const [numbers, setNumbers] = useState([])
  const [selectedNumber, setSelectedNumber] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const packages = [
    { name: 'Starter', sms: 20, price: 2.49, icon: Zap },
    { name: 'Standard', sms: 50, price: 5.49, icon: CreditCard, popular: true },
    { name: 'Premium', sms: 100, price: 9.99, icon: Tag },
  ]

  useEffect(() => {
    loadNumbers()
  }, [])

  // Bachs sends the buyer back here with ?checkout=success or ?checkout=cancelled.
  // Credits are added by the backend when the Bachs webhook confirms payment.
  useEffect(() => {
    const outcome = searchParams.get('checkout')
    if (!outcome) return
    setSearchParams({}, { replace: true })
    if (outcome === 'success') {
      toast.success('Payment received! Your credits will appear in a moment.')
      setTimeout(loadNumbers, 4000)
    } else {
      toast('Checkout cancelled. You have not been charged.')
    }
  }, [searchParams])

  const loadNumbers = async () => {
    try {
      const data = await api.getMyNumbers()
      const nums = data || []
      setNumbers(nums)
      if (nums.length > 0) setSelectedNumber(nums[0].id.toString())
    } catch (err) {
      setNumbers([])
      setSelectedNumber('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async () => {
    setIsRedirecting(true)
    try {
      const returnUrl = `${window.location.origin}/credits`
      const result = await api.createCheckout({
        purpose: 'credits',
        number_id: selectedNumber,
        sms_credits: selectedPackage.sms,
        amount: selectedPackage.price.toFixed(2),
        currency: 'USD',
        success_url: `${returnUrl}?checkout=success`,
        cancel_url: `${returnUrl}?checkout=cancelled`,
      })
      if (!result.checkout_url) throw new Error('Could not start checkout')
      window.location.href = result.checkout_url
    } catch (err) {
      toast.error(err.message || 'Failed to start checkout')
      setIsRedirecting(false)
    }
  }

  const selectedNumberData = numbers.find(n => n.id.toString() === selectedNumber)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Add text credits</h1>
          <p className="mt-2 text-gray-400">Top up so your number keeps receiving texts.</p>
        </div>

        {numbers.length === 0 ? (
          <Card className="p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">You'll need a number first</h3>
            <p className="text-gray-400 mb-6">Get a number, then come back here to add credits.</p>
            <Link to="/buy">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" /> Buy a Number
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Select Number */}
            <Card className="p-5 mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Number</label>
              <div className="relative">
                <select
                  value={selectedNumber}
                  onChange={(e) => setSelectedNumber(e.target.value)}
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500"
                >
                  {numbers.map((number) => (
                    <option key={number.id} value={number.id}>
                      {number.phone_number} ({number.country})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">Current Credits</span>
                <span className="text-lg font-bold text-white">{selectedNumberData?.credits || 0}</span>
              </div>
              <div className="mt-2 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, ((selectedNumberData?.credits || 0) / 50) * 100)}%` }}
                />
              </div>
            </Card>

            {/* Packages */}
            <div className="space-y-4 mb-8">
              {packages.map((pkg) => (
                <button
                  key={pkg.name}
                  onClick={() => { setSelectedPackage(pkg); setSuccess(false) }}
                  className={`w-full relative p-5 bg-dark-900 border rounded-xl hover:border-brand-500/50 transition-colors text-left ${
                    selectedPackage?.name === pkg.name ? 'border-brand-500/50 ring-1 ring-brand-500/30' : 'border-dark-800'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 right-4 px-2 py-0.5 bg-brand-500 text-[#fff] text-xs font-semibold rounded">
                      Best Value
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-brand-500/10 rounded-lg">
                        <pkg.icon className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{pkg.name}</p>
                        <p className="text-sm text-gray-400">{pkg.sms} SMS credits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">${pkg.price}</p>
                      <p className="text-xs text-gray-400">{Math.round((pkg.price / pkg.sms) * 100) / 100}/SMS</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Payment */}
            {selectedPackage && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 text-center">Checkout</h3>
                <p className="text-gray-400 text-sm mb-4 text-center">
                  Secure payment processing for {selectedPackage.sms} SMS credits.
                </p>
                <div className="bg-dark-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Package</span>
                    <span className="text-white font-medium">{selectedPackage.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-400">Credits</span>
                    <span className="text-white font-medium">{selectedPackage.sms} SMS</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2 pt-2 border-t border-dark-700">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-brand-400 font-bold">${selectedPackage.price}</span>
                  </div>
                </div>
                {success ? (
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Credits added successfully!</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleCheckout}
                    isLoading={isRedirecting}
                    disabled={isRedirecting}
                  >
                    {isRedirecting ? 'Opening secure checkout...' : `Pay $${selectedPackage.price}`}
                  </Button>
                )}
                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  You'll pay on Bachs's secure checkout page. Prime Digits never sees your card details.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Credits
