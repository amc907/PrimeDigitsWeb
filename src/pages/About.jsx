import React from 'react'
import { Shield, Users, Zap, Target, MapPin, Mail, Calendar, Building2, Globe, CheckCircle } from 'lucide-react'
import Card from '../components/ui/Card'

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Privacy',
      description: 'Your data and communications are protected with industry-standard encryption. We never share your information with third parties.',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Numbers activate instantly and SMS messages are delivered in real-time. No waiting, no delays.',
    },
    {
      icon: Target,
      title: 'Reliability',
      description: 'Our infrastructure is built for uptime. We maintain 99.9% availability with redundant systems across multiple regions.',
    },
    {
      icon: Users,
      title: 'Support',
      description: 'Our dedicated support team is available to help you succeed. We respond to all inquiries within 24 hours.',
    },
  ]

  const trustBadges = [
    'EIN Registered: 42-2601844',
    'SSL Secured Platform',
    'GDPR Compliant',
    '24/7 Infrastructure Monitoring',
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">About Prime Digits</h1>
          <p className="mt-4 text-lg text-gray-400">
            Providing reliable virtual phone numbers to developers and freelancers worldwide.
          </p>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Prime Digits was founded in 2026 with a clear mission: to provide developers, freelancers, and businesses 
              with reliable, secure, and easy-to-use virtual phone numbers for SMS verification. We believe that privacy 
              and security should not come at the cost of convenience.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              In a world where online verification is essential, we provide the tools you need to protect your 
              personal phone number while maintaining access to the services that require it.
            </p>

            <div className="space-y-3">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-gold-500 mr-2 flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '10K+', label: 'Numbers Delivered' },
              { value: '99.9%', label: 'Uptime' },
              { value: '3', label: 'Countries Available' },
              { value: '<1s', label: 'SMS Delivery' },
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-2xl font-bold text-gold-500">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Business Details */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <Building2 className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="text-white font-semibold mb-1">Legal Name</h3>
              <p className="text-gray-400 text-sm">Prime Digits</p>
            </Card>
            <Card className="p-6">
              <Shield className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="text-white font-semibold mb-1">EIN</h3>
              <p className="text-gray-400 text-sm">42-2601844</p>
            </Card>
            <Card className="p-6">
              <Calendar className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="text-white font-semibold mb-1">Founded</h3>
              <p className="text-gray-400 text-sm">2026</p>
            </Card>
            <Card className="p-6">
              <Globe className="w-8 h-8 text-gold-500 mb-3" />
              <h3 className="text-white font-semibold mb-1">Website</h3>
              <p className="text-gray-400 text-sm">primesdigits.com</p>
            </Card>
          </div>
        </div>

        {/* Addresses */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="p-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">US Headquarters</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    518 Magnolia Dr<br />
                    Osceola, AR 72370<br />
                    United States
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">UK Office</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    39 Ludgate Hill<br />
                    London, EC4M 7JN<br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <value.icon className="w-8 h-8 text-gold-500 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-6">
            Have questions or feedback? We would love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@primesdigits.com"
              className="inline-flex items-center px-6 py-3 bg-dark-800 hover:bg-dark-700 text-gray-300 font-medium rounded-lg transition-colors border border-dark-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              support@primesdigits.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
