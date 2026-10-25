import React from 'react'
import {
  TrendingUp, Building2, Shield, MapPin, Mail, Globe, Calendar, ExternalLink,
  CheckCircle, AlertTriangle, Users, Smartphone, Zap, UserCheck, PieChart,
  FileText, Bell, Receipt, Wallet,
} from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { investing, formatMoney } from '../data/investing'

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

// What investors get in their account on the funding portal
const accountFeatures = [
  { icon: UserCheck, title: 'Verified investor profile', text: 'The portal confirms your identity once, then you can invest in a few clicks.' },
  { icon: Wallet, title: 'Secure payments', text: 'Pay by bank transfer or card on the portal. Your money is held safely until the round closes.' },
  { icon: PieChart, title: 'Your portfolio', text: 'See how much you invested, how many shares you own and what they are worth.' },
  { icon: FileText, title: 'All the documents', text: 'Read the offering documents before you invest, and keep your investment agreement on file.' },
  { icon: Bell, title: 'Company updates', text: 'Get regular updates from us on growth, new features and how the business is doing.' },
  { icon: Receipt, title: 'Tax forms', text: 'Any tax documents you need are available to download from your account each year.' },
]

const steps = [
  'Open the PrimeDigits campaign on our funding portal.',
  'Create your free investor account and verify your identity.',
  `Choose how much to invest, from ${formatMoney(investing.minInvestment)} up to your legal limit.`,
  'Pay securely on the portal and sign your investment agreement.',
  'Track your shares and get company updates from your portfolio.',
]

const Invest = () => {
  const isLive = investing.status === 'live' && investing.campaignUrl

  const offeringTerms = [
    ['Minimum investment', formatMoney(investing.minInvestment)],
    ['Type of security', investing.securityType],
    ['Price per share', investing.pricePerShare],
    ['Target raise', investing.targetAmount],
    ['Maximum raise', investing.maximumAmount],
    ['Offering closes', investing.deadline],
    ['Funding portal', investing.portalName],
  ].filter(([, value]) => value)

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Community investment
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Invest in PrimeDigits</h1>
          <p className="mt-4 text-lg text-gray-400">
            {isLive
              ? `We're raising money from our community. Investments start at ${formatMoney(investing.minInvestment)} and are made through ${investing.portalName}, an SEC-registered funding portal.`
              : `Own a piece of the company you use. Investments will start at ${formatMoney(investing.minInvestment)} and are made through an SEC-registered funding portal, where every investor gets their own account.`}
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
                <h2 className="text-2xl font-bold text-white">How investing works</h2>
                <p className="mt-2 text-gray-400">
                  Investments are made on our funding portal, not on this website. Here's what the process looks like.
                </p>
                <ol className="mt-6 space-y-3">
                  {steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-gray-300">
                      <span className="w-7 h-7 rounded-full bg-brand-500 text-[#fff] text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-7 p-4 rounded-xl bg-dark-800/60 border border-dark-700">
                  <p className="text-sm text-gray-300">
                    The investment button will appear here as soon as our campaign is published on the portal.
                    Questions about investing? Email us.
                  </p>
                  <a href={`mailto:${investing.contactEmail}?subject=${encodeURIComponent('Question about investing in PrimeDigits')}`} className="inline-block mt-3">
                    <Button variant="secondary" size="sm">
                      <Mail className="w-4 h-4 mr-1.5" /> {investing.contactEmail}
                    </Button>
                  </a>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* What an investor account includes */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Your investor account</h2>
            <p className="mt-3 text-gray-400">
              {isLive ? `When you invest on ${investing.portalName}, you get` : 'When you invest through our funding portal, you get'} your own
              investor account with everything in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accountFeatures.map(f => (
              <Card key={f.title} className="p-5">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="mt-3 font-bold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-400 leading-relaxed">{f.text}</p>
              </Card>
            ))}
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
