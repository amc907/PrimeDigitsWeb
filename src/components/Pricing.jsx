import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Button from './ui/Button'
import Card from './ui/Card'

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$3.99',
      period: '/month',
      desc: 'Try it out for a month',
      features: [
        '1 virtual number',
        '30 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Email support'
      ]
    },
    {
      name: 'Standard',
      price: '$9.99',
      period: '/3 months',
      desc: 'Save 16% vs. paying monthly',
      features: [
        '1 virtual number',
        '90 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Professional',
      price: '$17.99',
      period: '/6 months',
      desc: 'Save 25% vs. paying monthly',
      features: [
        '1 virtual number',
        '180 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: '/year',
      desc: 'Save 37% vs. paying monthly',
      features: [
        '1 virtual number',
        '365 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Priority support',
        'Number guaranteed for 1 year'
      ]
    }
  ]

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Pick your plan</h2>
          <p className="mt-4 text-gray-400">Every plan comes with one US or Canadian number and 15 texts. The longer you keep it, the less you pay.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative p-6 ${plan.popular ? 'border-brand-500/50 shadow-brand-500/10' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-[#fff] text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="ml-1 text-gray-400 text-sm">{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">{plan.desc}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-brand-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block mt-8">
                <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">
                  Choose {plan.name}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
