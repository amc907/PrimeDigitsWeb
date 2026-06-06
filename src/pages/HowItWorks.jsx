import React from 'react'
import { Search, ShoppingCart, Phone, MessageSquare, RefreshCw, Shield } from 'lucide-react'
import Card from '../components/ui/Card'

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse Available Numbers',
      description: 'Explore our inventory of virtual numbers from the United States and Canada. Each number is ready for instant activation.'
    },
    {
      icon: ShoppingCart,
      title: 'Choose Your Plan',
      description: 'Select the duration that fits your needs — daily, weekly, or monthly. All plans include SMS credits and come with transparent pricing.',
    },
    {
      icon: Phone,
      title: 'Instant Activation',
      description: 'Your number is activated immediately after purchase. No waiting, no delays. Start using it right away for verifications.',
    },
    {
      icon: MessageSquare,
      title: 'Receive SMS',
      description: 'All incoming SMS messages are delivered in real-time to your dashboard. View full message content with timestamps and sender details.',
    },
    {
      icon: RefreshCw,
      title: 'Renew or Extend',
      description: 'Need more time? Easily renew your number or add SMS credits from your dashboard. Your history stays accessible.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never share your information. Numbers are dedicated to you for the duration of your plan.',
    },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">How PrimeDigits Works</h1>
          <p className="mt-4 text-lg text-gray-400">
            Getting a virtual phone number has never been easier. Follow these simple steps to start receiving SMS instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Card key={i} className="p-6 hover:border-gold-500/30 transition-colors animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-20 text-center">
          <p className="text-gray-400">Have more questions?</p>
          <a href="/faq" className="mt-2 inline-flex items-center text-gold-500 hover:text-gold-400 font-medium transition-colors">
            Visit our FAQ page
          </a>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
