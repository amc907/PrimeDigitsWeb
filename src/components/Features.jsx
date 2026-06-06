import React from 'react'
import { Shield, Zap, Globe, Clock, MessageSquare, CreditCard } from 'lucide-react'
import Card from './ui/Card'

const Features = () => {
  const features = [
    { icon: Shield, title: 'Maximum Security', desc: 'End-to-end encryption and secure number handling protect your data.' },
    { icon: Zap, title: 'Instant Delivery', desc: 'Receive SMS messages in real-time with sub-second latency.' },
    { icon: Globe, title: 'Global Coverage', desc: 'Numbers from US and Canada with more regions coming soon.' }
    { icon: Clock, title: 'Flexible Duration', desc: 'Choose from monthly, quarterly, 6-month, or annual plans that fit your needs.' },
    { icon: MessageSquare, title: 'SMS History', desc: 'Access complete message history for all your numbers anytime.' },
    { icon: CreditCard, title: 'Simple Pricing', desc: 'Transparent pricing with no hidden fees. Pay only for what you use.' },
  ]

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Choose PrimeDigits?</h2>
          <p className="mt-4 text-gray-400">Everything you need for reliable SMS verification, built for professionals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="p-6 hover:border-gold-500/30 transition-colors group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <feature.icon className="w-10 h-10 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
