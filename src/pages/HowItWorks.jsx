import React from 'react'
import { Search, ShoppingCart, Phone, MessageSquare, RefreshCw, Shield } from 'lucide-react'
import Card from '../components/ui/Card'

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Pick a country',
      description: 'Choose a number from the United States or Canada. Every number is ready to use the moment you buy it.',
    },
    {
      icon: ShoppingCart,
      title: 'Choose how long',
      description: 'Keep it for 1, 3, 6 or 12 months. Every plan includes 15 texts, and longer plans cost less per month.',
    },
    {
      icon: Phone,
      title: "It's live right away",
      description: 'Your number turns on as soon as payment goes through. Use it for sign-ups, deliveries or anything else.',
    },
    {
      icon: MessageSquare,
      title: 'Read your texts',
      description: 'Messages show up in your inbox, grouped by sender like a chat app. Verification codes get a one-tap copy button.',
    },
    {
      icon: RefreshCw,
      title: 'Top up anytime',
      description: 'Running low? Add more text credits from your dashboard. Your message history stays put.',
    },
    {
      icon: Shield,
      title: 'Private by design',
      description: 'Your number is yours alone for your whole plan. Your data is encrypted and we never share it.',
    },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">How it works</h1>
          <p className="mt-4 text-lg text-gray-400">
            Getting a second number takes about a minute. Here's the whole process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Card key={i} className="p-6 hover:border-brand-500/30 transition-colors animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-20 text-center">
          <p className="text-gray-400">Still curious?</p>
          <a href="/faq" className="mt-2 inline-flex items-center text-brand-400 hover:text-brand-400 font-medium transition-colors">
            Read the FAQ
          </a>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
