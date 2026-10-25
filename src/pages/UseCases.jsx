import React from 'react'
import { Code, ShieldCheck, Briefcase, Globe, Eye, Cpu, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const UseCases = () => {
  const useCases = [
    {
      icon: Code,
      title: 'Testing your app',
      description: 'Building something that sends texts? Use real numbers to test your sign-up and verification flows from start to finish.',
      points: [
        'Real numbers for real test runs',
        'A separate number for each test setup',
        'Texts show up within seconds',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'Sign-up codes',
      description: 'Get verification codes without handing out your personal number, then copy the code with one tap.',
      points: [
        'Codes from PayPal, Amazon, Google and more',
        'One-tap copy for every code',
        'Keeps your real number off marketing lists',
      ],
    },
    {
      icon: Briefcase,
      title: 'A line for your business',
      description: 'Keep work and personal separate with a US or Canadian number just for your business, and check it from anywhere.',
      points: [
        'Separate work from personal',
        'A local US or Canadian number',
        'Read messages from any browser',
      ],
    },
    {
      icon: Globe,
      title: 'Freelancing',
      description: 'Working with clients in the US or Canada? A local number makes you easier to reach and easier to trust. Handy for Upwork, Fiverr and similar sites.',
      points: [
        'A local number for overseas clients',
        'Look established from day one',
        'Great for freelance platforms',
      ],
    },
    {
      icon: Eye,
      title: 'Privacy',
      description: 'Online forms, deliveries, dating apps, one-time sign-ups: give them your PrimeDigits number and keep your real one private.',
      points: [
        'Keep your personal number private',
        'Use it for one-off sign-ups',
        'Less spam on your real phone',
      ],
    },
    {
      icon: Cpu,
      title: 'For developers',
      description: 'Connect PrimeDigits to your own app with our API and get incoming texts sent to your server by webhook.',
      points: [
        'Integrate with our API',
        'Webhooks for incoming texts',
        'Developer-friendly docs',
      ],
    },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">What people use it for</h1>
          <p className="mt-4 text-lg text-gray-400">
            A second number comes in handy more often than you'd think.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <Card key={i} className="p-6 hover:border-brand-500/30 transition-colors animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.points.map((point, pi) => (
                  <li key={pi} className="flex items-start text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 mr-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want a second number?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Sign up free and pick your number in about a minute.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg">
              Create free account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UseCases
