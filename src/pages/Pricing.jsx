import React from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus, Shield, Zap, Globe } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$3.99',
      period: 'per month',
      description: 'Try it out for a month',
      features: [
        '1 virtual number',
        '30 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Email support'
      ],
      cta: 'Choose Starter',
      popular: false,
    },
    {
      name: 'Standard',
      price: '$9.99',
      period: 'per 3 months',
      description: 'Save 17% vs. paying monthly',
      features: [
        '1 virtual number',
        '90 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Priority support'
      ],
      cta: 'Choose Standard',
      popular: true,
    },
    {
      name: 'Professional',
      price: '$17.99',
      period: 'per 6 months',
      description: 'Save 25% vs. paying monthly',
      features: [
        '1 virtual number',
        '180 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Priority support'
      ],
      cta: 'Choose Professional',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: 'per year',
      description: 'Save 37% vs. paying monthly',
      features: [
        '1 virtual number',
        '365 days active',
        '15 SMS credits included',
        'US or Canada number',
        'Priority support',
        'Number guaranteed for 1 year'
      ],
      cta: 'Choose Enterprise',
      popular: false,
    },
  ]

  // Side-by-side comparison; one value per plan, in the same order as `plans`
  const comparison = [
    { label: 'Price', values: ['$3.99', '$9.99', '$17.99', '$29.99'] },
    { label: 'Works out to', values: ['$3.99/mo', '$3.33/mo', '$3.00/mo', '$2.50/mo'] },
    { label: 'You save', values: [null, '17%', '25%', '37%'] },
    { label: 'Days active', values: ['30', '90', '180', '365'] },
    { label: 'Texts included', values: ['15', '15', '15', '15'] },
    { label: 'US or Canada number', values: [true, true, true, true] },
    { label: 'Priority support', values: [false, true, true, true] },
    { label: 'Number guaranteed for 1 year', values: [false, false, false, true] },
  ]

  const renderCell = (value) => {
    if (value === true) return <Check className="w-5 h-5 text-green-400 mx-auto" />
    if (value === false || value === null) return <Minus className="w-4 h-4 text-gray-600 mx-auto" />
    return value
  }

  const countries = [
    { flag: '🇺🇸', name: 'United States', price: 'From $3.99' },
    { flag: '🇨🇦', name: 'Canada', price: 'From $3.99' },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Simple pricing</h1>
          <p className="mt-4 text-lg text-gray-400">
            One number, 15 texts included, and no hidden fees. The longer you keep it, the less you pay each month.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative p-6 lg:p-8 ${plan.popular ? 'border-brand-500/50 shadow-lg shadow-brand-500/10' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-[#fff] text-xs font-semibold rounded-full">
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
                    <Check className="w-4 h-4 text-brand-400 mr-2 flex-shrink-0 mt-0.5" />
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

        {/* Comparison table */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Compare plans</h2>
          <p className="text-center text-gray-400 mb-8">Same number, same features. Longer plans just cost less each month.</p>
          <div className="overflow-x-auto rounded-2xl border border-dark-800 bg-dark-900">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left font-semibold text-gray-400 px-5 py-4">Plan</th>
                  {plans.map(plan => (
                    <th key={plan.name} className={`px-4 py-4 text-center font-bold ${plan.popular ? 'text-brand-400 bg-brand-500/5' : 'text-white'}`}>
                      {plan.name}
                      {plan.popular && <span className="block text-[11px] font-semibold text-brand-400">Most popular</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map(row => (
                  <tr key={row.label} className="border-b border-dark-800 last:border-0">
                    <td className="px-5 py-3.5 text-gray-300 font-medium">{row.label}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className={`px-4 py-3.5 text-center text-white ${plans[i].popular ? 'bg-brand-500/5' : ''}`}>
                        {renderCell(value)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-5 py-4" />
                  {plans.map(plan => (
                    <td key={plan.name} className={`px-3 py-4 ${plan.popular ? 'bg-brand-500/5' : ''}`}>
                      <Link to="/register">
                        <Button variant={plan.popular ? 'primary' : 'secondary'} size="sm" className="w-full">
                          {plan.cta}
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Country Pricing */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {countries.map((country, i) => (
              <Card key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-white font-medium">{country.name}</span>
                </div>
                <span className="text-brand-400 font-semibold text-sm">{country.price}</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Shield, title: 'Secure checkout', desc: 'Payments are handled by Stripe. We never see your card number.' },
            { icon: Zap, title: 'Ready right away', desc: 'Your number works as soon as payment goes through.' },
            { icon: Globe, title: 'US & Canada', desc: 'Local numbers from both countries, with more on the way.' },
          ].map((feature, i) => (
            <div key={i} className="text-center">
              <feature.icon className="w-8 h-8 text-brand-400 mx-auto mb-3" />
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
