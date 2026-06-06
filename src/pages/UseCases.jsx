import React from 'react'
import { Code, ShieldCheck, Briefcase, Globe, Eye, Cpu, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const UseCases = () => {
  const useCases = [
    {
      icon: Code,
      title: 'App Development & Testing',
      description: 'Test SMS features in your applications with dedicated virtual numbers. Set up multiple numbers for different test scenarios and get instant SMS delivery for fast iteration.',
      points: [
        'Test SMS features in your applications',
        'Multiple numbers for different test scenarios',
        'Instant SMS delivery for fast testing',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Account Verification (2FA/OTP)',
      description: 'Verify accounts on any platform securely. Receive OTP codes instantly and protect your personal number from being linked to online services.',
      points: [
        'Verify accounts on any platform',
        'Receive OTP codes instantly',
        'Works with PayPal, Amazon, Google & more',
      ],
    },
    {
      icon: Briefcase,
      title: 'Business Communication',
      description: 'Keep your business and personal life separate. Establish a professional US or Canada presence globally and manage business SMS from anywhere in the world.'
      points: [
        'Separate business number from personal',
        'Professional US/Canada presence globally',
        'Manage business SMS from anywhere',
      ],
    },
    {
      icon: Globe,
      title: 'Remote Work & Freelancing',
      description: 'Get a local number for international clients and build trust with a local phone presence. Perfect for Upwork, Fiverr, and other freelance platforms.',
      points: [
        'Get a local number for international clients',
        'Build trust with local phone presence',
        'Perfect for Upwork, Fiverr freelancers',
      ],
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Keep your personal number private when signing up for online services. Use a virtual number for online signups and protect your identity online.',
      points: [
        'Keep personal number private',
        'Use virtual number for online signups',
        'Protect identity online',
      ],
    },
    {
      icon: Cpu,
      title: 'Developer API Integration',
      description: 'Integrate our API into your apps and receive webhooks for incoming SMS. Build SMS-dependent features easily with our developer-friendly documentation.',
      points: [
        'Integrate our API into your apps',
        'Receive webhooks for incoming SMS',
        'Build SMS-dependent features easily',
      ],
    },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Use Cases</h1>
          <p className="mt-4 text-lg text-gray-400">
            Discover how professionals and developers use Prime Digits virtual numbers every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <Card key={i} className="p-6 hover:border-gold-500/30 transition-colors animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.points.map((point, pi) => (
                  <li key={pi} className="flex items-start text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 mr-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Join thousands of developers and professionals who trust Prime Digits for their virtual number needs.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UseCases
