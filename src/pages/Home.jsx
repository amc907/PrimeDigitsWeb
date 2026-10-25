import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield, Globe, Zap, CheckCircle, Clock, TrendingUp, Users,
  MessageSquare, CreditCard, Lock, Smartphone, Mail, MapPin, ChevronRight,
  Star, Rocket, RefreshCw, Headphones, BadgeCheck, Bell, KeyRound,
  CircleDot, MousePointerClick, Inbox, Fingerprint, Eye, EyeOff,
  Phone, Send, Wallet, ShoppingCart, MessageCircle, Car, Search, Facebook
} from 'lucide-react'
import Button from '../components/ui/Button'
import PricingSection from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import { faqs, homeFaqIndexes } from '../data/faqs'
import { investing, isInvestingLive, formatMoney } from '../data/investing'

/* ------------------------------------------------------------------ */
/*  Reusable floating-badge component for the hero                    */
/* ------------------------------------------------------------------ */
const FloatingBadge = ({ icon: Icon, text, className, delay = 0 }) => (
  <div
    className={`absolute flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-800/90 backdrop-blur-sm border border-dark-700 shadow-xl shadow-black/20 ${className}`}
    style={{
      animation: `floatY 4s ease-in-out ${delay}s infinite`,
    }}
  >
    <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center">
      <Icon className="w-4 h-4 text-green-400" />
    </div>
    <span className="text-white text-xs font-semibold whitespace-nowrap">{text}</span>
  </div>
)

/* ------------------------------------------------------------------ */
/*  Messenger-style phone mock-up for the hero                        */
/* ------------------------------------------------------------------ */
const threads = [
  { from: 'PayPal', initial: 'P', color: 'bg-blue-500', msg: 'Your code is 739201', time: '9:41', unread: true },
  { from: 'Amazon', initial: 'A', color: 'bg-orange-500', msg: 'OTP: 482917. Do not share it.', time: '9:38', unread: true },
  { from: 'WhatsApp', initial: 'W', color: 'bg-green-500', msg: 'Your WhatsApp code: 615-204', time: 'Yesterday' },
  { from: 'Google', initial: 'G', color: 'bg-red-500', msg: 'G-552190 is your verification code.', time: 'Mon' },
]

const PhoneMockup = () => (
  <div className="relative mx-auto w-64 sm:w-72">
    {/* Phone frame */}
    <div className="relative bg-dark-800 rounded-[2.5rem] p-2 shadow-2xl shadow-black/40 border border-dark-700">
      <div className="bg-dark-900 rounded-[2rem] overflow-hidden">
        {/* Notch */}
        <div className="h-6 flex justify-center items-end pb-1">
          <div className="w-20 h-4 bg-dark-800 rounded-full" />
        </div>
        {/* App header with the user's number */}
        <div className="px-4 pt-2 pb-3 border-b border-dark-800">
          <p className="text-[10px] text-gray-500">My number</p>
          <div className="flex items-center justify-between">
            <p className="text-white text-sm font-bold tracking-wide">+1 (870) 555-0142</p>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-semibold">Active</span>
          </div>
        </div>
        {/* Conversation list */}
        <div className="divide-y divide-dark-800">
          {threads.map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-[#fff] text-sm font-bold flex-shrink-0`}>
                {t.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-xs ${t.unread ? 'text-white font-semibold' : 'text-gray-300 font-medium'}`}>{t.from}</p>
                  <span className="text-[9px] text-gray-500">{t.time}</span>
                </div>
                <p className={`text-[11px] truncate ${t.unread ? 'text-gray-300' : 'text-gray-500'}`}>{t.msg}</p>
              </div>
              {t.unread && <div className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />}
            </div>
          ))}
        </div>
        {/* Open thread preview */}
        <div className="px-4 pt-3 pb-5 bg-dark-950/60 space-y-2">
          <p className="text-center text-[9px] text-gray-600">Today 9:41</p>
          <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-md bg-dark-800 text-[11px] text-gray-200">
            Your PayPal code is <span className="font-bold text-brand-400 tracking-widest">739201</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 h-8 rounded-full bg-dark-800 border border-dark-700 px-3 flex items-center text-[10px] text-gray-500">
              Message
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
              <Send className="w-3.5 h-3.5 text-[#fff]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating badges around the phone */}
    <FloatingBadge icon={Bell} text="New code received" className="-top-4 -right-4 sm:-right-10" delay={0} />
    <FloatingBadge icon={BadgeCheck} text="Real US & CA numbers" className="top-36 -left-6 sm:-left-20 lg:-left-44" delay={0.8} />
    <FloatingBadge icon={Shield} text="Private & secure" className="-bottom-3 -right-2 sm:-right-8" delay={1.6} />
  </div>
)

/* ------------------------------------------------------------------ */
/*  Animated counter for stats                                        */
/* ------------------------------------------------------------------ */
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

const StatItem = ({ value, suffix, label, icon: Icon }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
  const { count, ref } = useCountUp(numericValue)
  const displayValue = value.replace(/[0-9,]+/, count.toLocaleString())

  return (
    <div ref={ref} className="text-center group">
      <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-brand-500/20 transition-all duration-300">
        <Icon className="w-7 h-7 text-brand-400" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-white">{displayValue}{suffix}</div>
      <div className="mt-1 text-sm text-gray-400">{label}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Invest in PrimeDigits                                             */
/* ------------------------------------------------------------------ */
const HomeInvest = () => {
  const live = isInvestingLive()
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-500 px-6 py-12 sm:px-12 sm:py-14">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#fff]/10 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#4f46e5]/40 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff]/15 text-[#fff] text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> {live ? 'Community investment' : 'Coming soon'}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#fff] leading-tight">
                Own a piece of PrimeDigits
              </h2>
              <p className="mt-4 text-[#fff]/80 text-lg leading-relaxed">
                Invest in the company behind your second number, starting from {formatMoney(investing.minInvestment)}.
                {live ? ` Investments are made on ${investing.portalName}.` : ' Investments are made through an SEC-registered funding portal.'}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {live ? (
                  <a href={investing.campaignUrl} target="_blank" rel="noopener noreferrer">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#fff] text-[#6d28d9] font-bold hover:bg-[#f5f3ff] transition-colors">
                      Invest from {formatMoney(investing.minInvestment)} <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </a>
                ) : (
                  <span className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#fff]/15 border border-[#fff]/25 text-[#fff] font-bold cursor-default">
                    Investing opens soon
                  </span>
                )}
                <Link to="/invest">
                  <button className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold transition-colors ${
                    live ? 'border-2 border-[#fff]/40 text-[#fff] hover:bg-[#fff]/10' : 'bg-[#fff] text-[#6d28d9] hover:bg-[#f5f3ff]'
                  }`}>
                    Learn more {!live && <ArrowRight className="ml-2 w-5 h-5" />}
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: formatMoney(investing.minInvestment), label: 'Minimum investment' },
                { value: 'Any amount', label: `above ${formatMoney(investing.minInvestment)}, within your legal limit` },
                { value: 'SEC', label: 'Registered funding portal' },
                { value: 'Your account', label: 'Portfolio, documents and updates' },
              ].map(item => (
                <div key={item.label} className="rounded-2xl bg-[#fff]/10 border border-[#fff]/15 p-5">
                  <p className="text-2xl font-extrabold text-[#fff]">{item.value}</p>
                  <p className="mt-1 text-sm text-[#fff]/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="relative mt-8 text-xs text-[#fff]/60 leading-relaxed">
            {live
              ? `This offering is made only through ${investing.portalName}. Read the offering documents there before investing. Investing in startups is risky and you could lose your money.`
              : 'No money is being accepted on this website. Investments can only be made through an SEC-registered funding portal once our offering statement is filed. Investing in startups is risky.'}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Short FAQ for the home page                                       */
/* ------------------------------------------------------------------ */
const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const items = homeFaqIndexes.map(i => faqs[i])

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Before you sign up</h2>
          <p className="mt-4 text-gray-400">The things people ask us most.</p>
        </div>
        <div className="space-y-3">
          {items.map((faq, i) => (
            <div key={faq.question} className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-dark-800/50 transition-colors"
              >
                <span className="text-white font-semibold pr-4">{faq.question}</span>
                <ChevronRight className={`w-5 h-5 text-brand-400 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
              </button>
              {openIndex === i && (
                <p className="px-5 pb-4 text-gray-400 text-sm leading-relaxed animate-fade-in">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">
          More questions?{' '}
          <Link to="/faq" className="text-brand-400 font-semibold hover:underline">See all answers</Link>
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main page component                                               */
/* ------------------------------------------------------------------ */
const Home = () => {
  return (
    <div className="animate-fade-in overflow-x-hidden">
      {/* ───────────────────────────────────────────────────────────── */}
      {/*  HERO SECTION                                                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text */}
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4 mr-2" />
                A second number on the phone you already have
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Get a real phone number.{' '}
                <span className="brand-shimmer">Keep yours private.</span>
              </h1>
              <p
                className="mt-6 text-lg sm:text-xl text-gray-300"
                style={{ lineHeight: 1.75, opacity: 0.85, animation: 'fadeInUp 0.6s ease 0.3s both' }}
              >
                Pick a US or Canadian number in seconds and read every text in one simple inbox,
                from any browser. No SIM card, no contract, no new phone.
              </p>

              {/* Get-a-number card */}
              <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-dark-800 shadow-xl shadow-black/20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-white font-semibold">Choose your number</p>
                    <p className="text-gray-400 text-sm mt-0.5">🇺🇸 United States · 🇨🇦 Canada · from $3.99/mo</p>
                  </div>
                  <Link to="/register">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                      Get my number
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-brand-400" /> Live in under a minute
                </span>
                <span className="flex items-center gap-1.5">
                  <Inbox className="w-4 h-4 text-brand-400" /> Texts arrive instantly
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-brand-400" /> Cancel anytime
                </span>
              </div>
            </div>

            {/* Right: Phone mockup + floating badges */}
            <div className="relative flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  SOCIAL PROOF — App badges                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-dark-800 bg-dark-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-6">Get codes and texts from the apps you already use</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {[
              { icon: Wallet, label: 'PayPal', color: 'text-blue-400' },
              { icon: ShoppingCart, label: 'Amazon', color: 'text-orange-400' },
              { icon: MessageCircle, label: 'WhatsApp', color: 'text-green-400' },
              { icon: Car, label: 'Uber', color: 'text-white' },
              { icon: Search, label: 'Google', color: 'text-red-400' },
              { icon: Facebook, label: 'Facebook', color: 'text-blue-500' },
            ].map((app, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800/60 border border-dark-700 hover:border-brand-500/30 hover:bg-dark-800 transition-all duration-300 cursor-default"
              >
                <app.icon className={`w-5 h-5 ${app.color}`} />
                <span className="text-gray-300 text-sm font-medium">{app.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  STATS SECTION                                                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <StatItem value="10,000" suffix="+" label="Numbers Delivered" icon={Smartphone} />
            <StatItem value="3" suffix="" label="Countries Available" icon={Globe} />
            <StatItem value="99.9" suffix="%" label="Uptime Guaranteed" icon={TrendingUp} />
            <StatItem value="1" suffix="s" label="SMS Delivery" icon={Zap} />
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  FEATURES SECTION                                             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
              <Star className="w-3.5 h-3.5" />
              Why PrimeDigits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why people use PrimeDigits</h2>
            <p className="mt-4 text-gray-400">A real number for sign-ups, deliveries and anything you'd rather not give your own number to.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Your real number stays private',
                desc: 'Hand out your PrimeDigits number instead and keep your personal one off spam lists.',
                gradient: 'from-brand-500/10 to-brand-600/5',
              },
              {
                icon: Zap,
                title: 'Texts show up fast',
                desc: "Codes and messages land in your inbox within seconds, so you're never left waiting.",
                gradient: 'from-green-500/10 to-green-600/5',
              },
              {
                icon: Globe,
                title: 'US & Canadian numbers',
                desc: 'Pick a number from the United States or Canada. More countries are on the way.',
                gradient: 'from-blue-500/10 to-blue-600/5',
              },
              {
                icon: Clock,
                title: 'Keep it as long as you like',
                desc: 'Go month to month, or save with 3-month, 6-month and yearly plans.',
                gradient: 'from-purple-500/10 to-purple-600/5',
              },
              {
                icon: MessageSquare,
                title: 'Every text in one place',
                desc: 'Messages are grouped by sender like a chat app, and easy to search.',
                gradient: 'from-pink-500/10 to-pink-600/5',
              },
              {
                icon: CreditCard,
                title: 'Simple pricing',
                desc: 'From $3.99 a month with 15 texts included. No hidden fees.',
                gradient: 'from-cyan-500/10 to-cyan-600/5',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`relative group p-6 rounded-2xl border border-dark-800 bg-gradient-to-br ${feature.gradient} hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-dark-900/80 border border-dark-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-brand-500/30 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-brand-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  HOW IT WORKS SECTION                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-900/50 border-y border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
              <Rocket className="w-3.5 h-3.5" />
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Up and running in a minute</h2>
            <p className="mt-4 text-gray-400">Three steps. No paperwork, no SIM card.</p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-20 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-brand-500/20 via-brand-500/40 to-brand-500/20" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                {
                  num: '01',
                  title: 'Pick your country',
                  desc: 'Choose a number from the United States or Canada.',
                  icon: MapPin,
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-500/20',
                },
                {
                  num: '02',
                  title: 'Choose how long',
                  desc: 'One month, three months, six months or a full year.',
                  icon: MousePointerClick,
                  color: 'text-green-400',
                  bg: 'bg-green-500/10',
                  border: 'border-green-500/20',
                },
                {
                  num: '03',
                  title: 'Start getting texts',
                  desc: 'Your number is live right after checkout. Use it anywhere you need a phone number.',
                  icon: Inbox,
                  color: 'text-brand-400',
                  bg: 'bg-brand-500/10',
                  border: 'border-brand-500/20',
                },
              ].map((step, i) => (
                <div key={i} className="relative text-center animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                  {/* Step circle */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className={`w-20 h-20 rounded-full ${step.bg} ${step.border} border-2 flex items-center justify-center relative z-10`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-500 text-[#fff] text-xs font-bold flex items-center justify-center z-20 shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  COUNTRIES SECTION                                            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
              <Globe className="w-3.5 h-3.5" />
              Numbers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Choose your number</h2>
            <p className="mt-4 text-gray-400">Real local numbers, powered by Telnyx.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                flag: '🇺🇸',
                name: 'United States',
                code: '+1',
                status: 'Available',
                price: '$3.99',
                period: '/mo',
                features: ['Instant Activation', '15 SMS Included', 'Telnyx Powered'],
                gradient: 'from-blue-500/10 to-red-500/5',
              },
              {
                flag: '🇨🇦',
                name: 'Canada',
                code: '+1',
                status: 'Available',
                price: '$3.99',
                period: '/mo',
                features: ['Instant Activation', '15 SMS Included', 'Telnyx Powered'],
                gradient: 'from-red-500/10 to-white/5',
              },
            ].map((country, i) => (
              <div
                key={i}
                className={`relative group rounded-2xl border border-dark-800 bg-gradient-to-br ${country.gradient} p-6 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl mb-4">{country.flag}</div>
                <h3 className="text-white font-semibold text-lg">{country.name}</h3>
                <p className="text-gray-500 text-sm">{country.code} Numbers</p>
                <div className="flex items-baseline mt-3">
                  <span className="text-2xl font-bold text-brand-400">{country.price}</span>
                  <span className="text-gray-400 text-sm ml-1">{country.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {country.features.map((f, fi) => (
                    <li key={fi} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/buy" className="block mt-6">
                  <Button variant="secondary" className="w-full group/btn">
                    Get Number
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">More countries coming soon.</p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  TRUST SECTION                                                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-dark-900/50 border-y border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
              <Shield className="w-3.5 h-3.5" />
              Trust
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">A real, registered business</h2>
            <p className="mt-3 text-gray-400">PrimeDigits is a registered US company. Here's what that means for you.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: 'EIN Registered', desc: 'Business: 42-2601844' },
              { icon: LockIcon, label: 'SSL Secured', desc: 'End-to-end encryption' },
              { icon: CheckCircle, label: 'GDPR Compliant', desc: 'EU data protection' },
              { icon: Headphones, label: '24/7 Support', desc: 'Always here to help' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-5 rounded-2xl bg-dark-800/40 border border-dark-800 hover:border-brand-500/20 hover:bg-dark-800/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-brand-400" />
                </div>
                <p className="text-white font-medium text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
      <Testimonials />
      <HomeInvest />
      <HomeFAQ />

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  CTA SECTION                                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-900/50 border-y border-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5" />
            Ready when you are
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Get your second number today</h2>
          <p className="mt-4 text-lg text-gray-400">
            Sign up free, pick a number, and start getting texts in about a minute.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="group">
                Create free account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/buy">
              <Button variant="outline" size="lg">
                Browse numbers
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" /> Free to sign up
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" /> Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Inline keyframe styles for floating animation */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes brandShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 0.85; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Lock icon (local)                                                */
/* ------------------------------------------------------------------ */
function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export default Home
