import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, Shield } from 'lucide-react'
import Button from './ui/Button'

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

const StripePaymentForm = ({ amount, buttonText, onSuccess, onError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setCardError(null)

    // Simulate Stripe processing delay
    // In production, create payment intent on backend first:
    // const { clientSecret } = await api.createPaymentIntent(amount)
    // const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement) } })
    await new Promise(resolve => setTimeout(resolve, 1500))

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    if (error) {
      setCardError(error.message)
      setIsProcessing(false)
      onError?.(error.message)
      return
    }

    setIsProcessing(false)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Details
        </label>
        <div className="p-3 bg-dark-950 border border-dark-700 rounded-lg">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        {cardError && (
          <p className="mt-2 text-sm text-red-400">{cardError}</p>
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
        isLoading={isProcessing}
        disabled={!stripe}
      >
        {isProcessing ? 'Processing...' : buttonText}
      </Button>
    </form>
  )
}

export default StripePaymentForm
