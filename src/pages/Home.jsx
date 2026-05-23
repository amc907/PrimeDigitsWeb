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
/*  Phone mock-up SVG                                                 */
/* ------------------------------------------------------------------ */
const PhoneMockup = () => (
  <div className="relative mx-auto w-64 sm:w-72">
    {/* Phone frame */}
    <div className="relative bg-dark-800 rounded-[2.5rem] p-2 shadow-2xl shadow-black/40 border border-dark-700">
      <div className="bg-dark-900 rounded-[2rem] overflow-hidden">
        {/* Notch */}
        <div className="h-6 flex justify-center items-end pb-1">
          <div className="w-20 h-4 bg-dark-800 rounded-full" />
        </div>
        {/* Screen content */}
        <div className="px-4 pb-6 pt-2 space-y-3">
          {/* Status bar */}
          <div className="flex justify-between items-center text-[10px] text-gray-500 px-1">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-gold-500/30" />
              <div className="w-3 h-3 rounded-full bg-gold-500/50" />
              <div className="w-3 h-3 rounded-full bg-gold-500" />
            </div>
          </div>
          {/* Notification */}
          <div className="bg-dark-800/80 rounded-2xl p-3 border border-dark-700 animate-pulse-slow">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold-500/15 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-gold-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold">PrimeDigits</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Your verification code is</p>
                <p className="text-gold-400 text-lg font-bold tracking-widest mt-1">4 8 2 9 1 7</p>
              </div>
            </div>
          </div>
          {/* App icons row */}
          <div className="flex justify-around pt-2">
            {[
              { icon: ShoppingCart, label: 'Amazon' },
              { icon: Wallet, label: 'PayPal' },
              { icon: MessageCircle, label: 'WhatsApp' },
              { icon: Search, label: 'Google' },
            ].map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center">
                  <app.icon className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-[9px] text-gray-500">{app.label}</span>
              </div>
            ))}
          </div>
          {/* Messages list */}
          <div className="space-y-2 pt-1">
            {[
              { from: 'PayPal', msg: 'Your code: 739201', time: '2m ago' },
              { from: 'Amazon', msg: 'OTP: 482917', time: '5m ago' },
            ].map((msg, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-dark-800/50">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium">{msg.from}</p>
                  <p className="text-gray-500 text-[10px] truncate">{msg.msg}</p>
                </div>
                <span className="text-gray-600 text-[9px]">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Floating badges around the phone */}
    <FloatingBadge icon={BadgeCheck} text="PayPal Verified" className="-top-4 -right-4 sm:-right-8" delay={0} />
    <FloatingBadge icon={BadgeCheck} text="Amazon Verified" className="top-20 -left-6 sm:-left-12" delay={0.8} />
    <FloatingBadge icon={BadgeCheck} text="WhatsApp Verified" className="-bottom-2 -right-2 sm:-right-6" delay={1.6} />
    <FloatingBadge icon={Shield} text="256-bit SSL" className="top-1/2 -right-4 sm:-right-10" delay={2.4} />
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
      <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
        <Icon className="w-7 h-7 text-gold-500" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-white">{displayValue}{suffix}</div>
      <div className="mt-1 text-sm text-gray-400">{label}</div>
    </div>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Text */}
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Instant Activation Worldwide
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                <span
                  className="text-white"
                  style={{
                    textShadow: '0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05)',
                  }}
                >
                  Premium Virtual Phone Numbers for{' '}
                </span>
                <span
                  className="gold-gradient-text"
                  style={{
                    background: 'linear-gradient(90deg, #D4AF37, #FFD700, #B8860B, #D4AF37)',
                    backgroundSize: '300% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'goldShimmer 3s ease infinite',
                    filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.35))',
                  }}
                >
                  SMS Verification
                </span>
              </h1>
              <p
                className="mt-6 text-lg sm:text-xl text-gray-300"
                style={{
                  lineHeight: 1.75,
                  opacity: 0.85,
                  animation: 'fadeInUp 0.6s ease 0.3s both',
                }}
              >
                Get secure, reliable virtual numbers instantly. Perfect for business verification,
                two-factor authentication, and protecting your privacy online.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-gray-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-gold-500" /> Secure
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-gold-500" /> Instant
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-gold-500" /> Global
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gold-500" /> Private
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
          <p className="text-center text-gray-500 text-sm mb-6">Verify with your favorite apps and services</p>
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
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800/60 border border-dark-700 hover:border-gold-500/30 hover:bg-dark-800 transition-all duration-300 cursor-default"
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold mb-4">
              <Star className="w-3.5 h-3.5" />
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Choose PrimeDigits?</h2>
            <p className="mt-4 text-gray-400">Everything you need for reliable SMS verification, built for professionals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Maximum Security',
                desc: 'End-to-end encryption and secure number handling protect your data.',
                gradient: 'from-gold-500/10 to-gold-600/5',
              },
              {
                icon: Zap,
                title: 'Instant Delivery',
                desc: 'Receive SMS messages in real-time with sub-second latency.',
                gradient: 'from-green-500/10 to-green-600/5',
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                desc: 'Numbers from US, UK, and Canada with more regions coming soon.',
                gradient: 'from-blue-500/10 to-blue-600/5',
              },
              {
                icon: Clock,
                title: 'Flexible Duration',
                desc: 'Choose from monthly, quarterly, 6-month, or annual plans that fit your needs.',
                gradient: 'from-purple-500/10 to-purple-600/5',
              },
              {
                icon: MessageSquare,
                title: 'SMS History',
                desc: 'Access complete message history for all your numbers anytime.',
                gradient: 'from-pink-500/10 to-pink-600/5',
              },
              {
                icon: CreditCard,
                title: 'Simple Pricing',
                desc: 'Transparent pricing with no hidden fees. Pay only for what you use.',
                gradient: 'from-cyan-500/10 to-cyan-600/5',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`relative group p-6 rounded-2xl border border-dark-800 bg-gradient-to-br ${feature.gradient} hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/5 animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-dark-900/80 border border-dark-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-gold-500/30 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-gold-500" />
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold mb-4">
              <Rocket className="w-3.5 h-3.5" />
              Quick Start
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-gray-400">Get your virtual number in three simple steps.</p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-20 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-gold-500/20 via-gold-500/40 to-gold-500/20" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                {
                  num: '01',
                  title: 'Choose a Country',
                  desc: 'Select from available countries including US, UK, and Canada.',
                  icon: MapPin,
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/10',
                  border: 'border-blue-500/20',
                },
                {
                  num: '02',
                  title: 'Pick a Plan',
                  desc: 'Choose the duration that works for you with transparent pricing.',
                  icon: MousePointerClick,
                  color: 'text-green-400',
                  bg: 'bg-green-500/10',
                  border: 'border-green-500/20',
                },
                {
                  num: '03',
                  title: 'Start Receiving',
                  desc: 'Your number is activated instantly. Start receiving SMS right away.',
                  icon: Inbox,
                  color: 'text-gold-400',
                  bg: 'bg-gold-500/10',
                  border: 'border-gold-500/20',
                },
              ].map((step, i) => (
                <div key={i} className="relative text-center animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                  {/* Step circle */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className={`w-20 h-20 rounded-full ${step.bg} ${step.border} border-2 flex items-center justify-center relative z-10`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold-500 text-dark-900 text-xs font-bold flex items-center justify-center z-20 shadow-lg">
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold mb-4">
              <Globe className="w-3.5 h-3.5" />
              Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Available Countries</h2>
            <p className="mt-4 text-gray-400">Get local numbers from trusted carriers across multiple regions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                flag: '🇺🇸',
                name: 'United States',
                code: '+1',
                status: 'Available',
                price: '$3.99',
                period: '/mo',
                features: ['Instant Activation', '15 SMS Included', 'Twilio Powered'],
                gradient: 'from-blue-500/10 to-red-500/5',
              },
              {
                flag: '🇬🇧',
                name: 'United Kingdom',
                code: '+44',
                status: 'Available',
                price: '$5.99',
                period: '/mo',
                features: ['Instant Activation', '15 SMS Included', 'Telnyx Powered'],
                gradient: 'from-red-500/10 to-blue-500/5',
              },
              {
                flag: '🇨🇦',
                name: 'Canada',
                code: '+1',
                status: 'Available',
                price: '$3.99',
                period: '/mo',
                features: ['Instant Activation', '15 SMS Included', 'Twilio Powered'],
                gradient: 'from-red-500/10 to-white/5',
              },
            ].map((country, i) => (
              <div
                key={i}
                className={`relative group rounded-2xl border border-dark-800 bg-gradient-to-br ${country.gradient} p-6 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/5 animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl mb-4">{country.flag}</div>
                <h3 className="text-white font-semibold text-lg">{country.name}</h3>
                <p className="text-gray-500 text-sm">{country.code} Numbers</p>
                <div className="flex items-baseline mt-3">
                  <span className="text-2xl font-bold text-gold-500">{country.price}</span>
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
                <Link to="/buy-number" className="block mt-6">
                  <Button variant="secondary" className="w-full group/btn">
                    Get Number
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">More countries coming soon</p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  TRUST SECTION                                                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-dark-900/50 border-y border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold mb-4">
              <Shield className="w-3.5 h-3.5" />
              Trust
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Trusted & Secure</h2>
            <p className="mt-3 text-gray-400">Prime Digits is a legitimate registered business built on transparency.</p>
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
                className="text-center p-5 rounded-2xl bg-dark-800/40 border border-dark-800 hover:border-gold-500/20 hover:bg-dark-800/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-gold-500" />
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

      {/* ───────────────────────────────────────────────────────────── */}
      {/*  CTA SECTION                                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-900/50 border-y border-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold mb-6">
            <Rocket className="w-3.5 h-3.5" />
            Get Started Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of professionals who trust Prime Digits for their SMS verification needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="group">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/buy-number">
              <Button variant="outline" size="lg">
                Browse Numbers
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" /> No credit card required
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
        @keyframes goldShimmer {
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
