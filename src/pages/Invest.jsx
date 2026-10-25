import React, { useState } from 'react'
import {
  TrendingUp, Building2, Shield, MapPin, Mail, Globe, Calendar, ExternalLink,
  CheckCircle, AlertTriangle, Users, Smartphone, Zap,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'
import { investing } from '../data/investing'

const AMOUNTS = [500, 1000, 2500, 5000, 10000]

const formatMoney = (n) => `$${n.toLocaleString('en-US')}`

const companyFacts = [
  { icon: Building2, label: 'Company', value: 'Prime Digits' },
  { icon: Shield, label: 'EIN', value: '42-2601844' },
  { icon: Calendar, label: 'Founded', value: '2026' },
  { icon: MapPin, label: 'Headquarters', value: '518 Magnolia Dr, Osceola, AR 72370' },
  { icon: Globe, label: 'Website', value: 'primesdigits.com' },
  { icon: Mail, label: 'Email', value: investing.contactEmail },
]

const highlights = [
  { icon: Smartphone, title: 'What we do', text: 'PrimeDigits gives people a real US or Canadian phone number they can use for sign-ups, codes and business, without a SIM card.' },
  { icon: Zap, title: 'How we make money', text: 'Customers pay for numbers on 1, 3, 6 or 12-month plans, starting at $3.99 a month, and can buy extra text credits.' },
  { icon: Users, title: "Who it's for", text: 'Freelancers, small businesses, developers testing apps, and anyone who wants to keep their personal number private.' },
]

const Invest = () => {
  const isLive = investing.status === 'live' && investing.campaignUrl
  const [form, setForm] = useState({ name: '', email: '', amount: String(investing.minInvestment), agree: false })

  const offeringTerms = [
    ['Minimum investment', formatMoney(investing.minInvestment)],
    ['Type of security', investing.securityType],
    ['Price per share', investing.pricePerShare],
    ['Target raise', investing.targetAmount],
    ['Maximum raise', investing.maximumAmount],
    ['Offering closes', investing.deadline],
    ['Funding portal', investing.portalName],
  ].filter(([, value]) => value)

  // No backend endpoint exists for this yet, so sign-ups go out as a pre-filled email
  const handleInterest = (e) => {
    e.preventDefault()
    if (!form.agree) {
      toast.error('Please tick the box to confirm you understand this is not an investment')
      return
    }
    const subject = `Investor interest: ${form.name}`
    const body = [
      'I would like to hear when the PrimeDigits investment round opens.',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Amount I might invest: ${formatMoney(Number(form.amount))}${Number(form.amount) === AMOUNTS[AMOUNTS.length - 1] ? '+' : ''}`,
      '',
      'I understand this is not an investment, no money is being collected, and it does not commit me to anything.',
    ].join('\n')
    window.location.href = `mailto:${investing.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast.success('Your email app should open now. Just press Send.')
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            {isLive ? 'Investment round open' : 'Investment round coming soon'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Invest in PrimeDigits</h1>
          <p className="mt-4 text-lg text-gray-400">
            {isLive
              ? `We're raising money from our community. Investments start at ${formatMoney(investing.minInvestment)} and are made through ${investing.portalName}, an SEC-registered funding portal.`
              : `We're planning to raise money from our community, with investments starting at ${formatMoney(investing.minInvestment)}. Leave your details and we'll tell you the moment it opens.`}
          </p>
        </div>

        {/* About the company */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {highlights.map(h => (
            <Card key={h.title} className="p-6">
              <h.icon className="w-7 h-7 text-brand-400 mb-3" />
              <h2 className="text-lg font-bold text-white">{h.title}</h2>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{h.text}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Company facts + offering terms */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Company facts</h2>
              <dl className="space-y-3.5">
                {companyFacts.map(f => (
                  <div key={f.label} className="flex items-start gap-3">
                    <f.icon className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-xs text-gray-500">{f.label}</dt>
                      <dd className="text-sm text-white font-medium break-words">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">The offering</h2>
              {isLive ? (
                <dl className="divide-y divide-dark-800">
                  {offeringTerms.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="text-sm text-gray-400">{label}</dt>
                      <dd className="text-sm text-white font-semibold text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-gray-400 leading-relaxed">
                  The minimum investment will be <span className="text-white font-semibold">{formatMoney(investing.minInvestment)}</span>, and
                  you can invest as much as you like above that, up to the limits set by law for your income. Share price, the type
                  of security and the full terms will be published with our offering documents when the round opens.
                </p>
              )}
            </Card>
          </div>

          {/* Action: invest on the portal, or register interest */}
          <div className="lg:col-span-3">
            {isLive ? (
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-brand-500/10 to-dark-900 border-brand-500/20">
                <h2 className="text-2xl font-bold text-white">Ready to invest?</h2>
                <p className="mt-2 text-gray-400 leading-relaxed">
                  Investments are made on {investing.portalName}. They verify your identity, take your payment securely,
                  and give you the official offering documents to read first.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    `Start from ${formatMoney(investing.minInvestment)}, and invest as much as you like within your legal limit`,
                    `Read our offering documents (Form C) on ${investing.portalName} before you invest`,
                    'Your payment and paperwork are handled by the portal, not by this website',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <a href={investing.campaignUrl} target="_blank" rel="noopener noreferrer" className="block mt-7">
                  <Button variant="primary" size="lg" className="w-full">
                    Invest from {formatMoney(investing.minInvestment)} on {investing.portalName}
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-white">Get notified when it opens</h2>
                <p className="mt-2 text-gray-400">
                  Tell us roughly how much you might invest. This is not an investment and you won't be charged anything.
                </p>
                <form onSubmit={handleInterest} className="mt-6 space-y-4">
                  <Input
                    label="Your name"
                    name="name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                  <div>
                    <p className="block text-sm font-medium text-gray-300 mb-2">How much might you invest?</p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {AMOUNTS.map((amount, i) => (
                        <button
                          type="button"
                          key={amount}
                          onClick={() => setForm({ ...form, amount: String(amount) })}
                          className={`py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                            form.amount === String(amount)
                              ? 'bg-brand-500 text-[#fff] border-brand-500'
                              : 'bg-dark-800 text-gray-200 border-dark-700 hover:border-brand-500/40'
                          }`}
                        >
                          {formatMoney(amount)}{i === AMOUNTS.length - 1 ? '+' : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={e => setForm({ ...form, agree: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded accent-brand-500"
                    />
                    I understand this is only a sign-up for updates. It is not an investment, no money is collected,
                    and it does not commit me to anything.
                  </label>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Notify me when it opens
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    This opens your email app with your details filled in. Just press Send.
                  </p>
                </form>
              </Card>
            )}
          </div>
        </div>

        {/* Required notices */}
        <div className="mt-12 p-5 rounded-2xl border border-dark-800 bg-dark-900">
          <p className="flex items-center gap-2 text-sm font-semibold text-white">
            <AlertTriangle className="w-4 h-4 text-yellow-400" /> Important information
          </p>
          <div className="mt-3 space-y-2 text-xs text-gray-500 leading-relaxed">
            {isLive ? (
              <>
                <p>
                  This offering is made only through {investing.portalName}. Please read the offering documents (Form C)
                  on {investing.portalName} before investing. PrimeDigits does not accept investments through this website.
                </p>
                <p>
                  Investing in early-stage companies is risky. You could lose all of the money you invest, and shares may
                  be hard to sell. Only invest an amount you can afford to lose.
                </p>
              </>
            ) : (
              <>
                <p>
                  PrimeDigits is considering an offering of securities. No money or other consideration is being solicited,
                  and if sent in response, will not be accepted.
                </p>
                <p>
                  No offer to buy the securities can be accepted and no part of the purchase price can be received until an
                  offering statement is filed and only through an SEC-registered intermediary's platform.
                </p>
                <p>
                  An indication of interest involves no obligation or commitment of any kind.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invest
