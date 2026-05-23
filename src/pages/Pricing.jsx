import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Shield, Zap, Globe } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$3.99',
      period: 'per month',
      description: 'Perfect for getting started',
      features: [
        '1 virtual number',
        '30 days active',
        '15 SMS credits included',
        'US, UK or Canada number',
        'Email support'
      ],
      cta: 'Get Starter Plan',
      popular: false,
    },
    {
      name: 'Standard',
      price: '$9.99',
      period: 'per 3 months',
      description: 'Best value for regular users',
      features: [
        '1 virtual number',
        '90 days active',
        '15 SMS credits included',
        'US, UK or Canada number',
        'Priority support'
      ],
      cta: 'Get Standard Plan',
      popular: true,
    },
    {
      name: 'Professional',
      price: '$17.99',
      period: 'per 6 months',
      description: 'For power users and freelancers',
      features: [
        '1 virtual number',
        '180 days active',
        '15 SMS credits included',
        'US, UK or Canada number',
        'Priority support'
      ],
      cta: 'Get Pro Plan',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: 'per year',
      description: 'Best for long-term number ownership',
      features: [
        '1 virtual number',
        '365 days active',
        '15 SMS credits included',
        'US, UK or Canada number',
        'Priority support',
        'Number guaranteed for 1 year'
      ],
      cta: 'Get Enterprise Plan',
      popular: false,
    },
  ]

  const countries = [
    { flag: '🇺🇸', name: 'United States', price: 'From $3.99' },
    { flag: '🇨🇦', name: 'Canada', price: 'From $3.99' },
    { flag: '🇬🇧', name: 'United Kingdom', price: 'From $3.99' },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-gray-400">
            No hidden fees. No surprises. Choose the plan that works for you and scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative p-6 lg:p-8 ${plan.popular ? 'border-gold-500/50 shadow-lg shadow-gold-500/10' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold-500 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
              </div>
              <p className="text-sm text-gray-400">{plan.period}</p>
              <p className="mt-3 text-sm text-gray-400">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start text-sm text-gray-300">
                    <Check className="w-4 h-4 text-gold-500 mr-2 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block mt-8">
                <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Country Pricing */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Available Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {countries.map((country, i) => (
              <Card key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-white font-medium">{country.name}</span>
                </div>
                <span className="text-gold-500 font-semibold text-sm">{country.price}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Shield, title: 'Secure Payments', desc: 'All transactions are encrypted and secure.' },
            { icon: Zap, title: 'Instant Activation', desc: 'Numbers are ready to use immediately.' },
            { icon: Globe, title: 'Global Numbers', desc: 'Access numbers from multiple countries.' },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <feature.icon className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-white font-medium">{feature.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
