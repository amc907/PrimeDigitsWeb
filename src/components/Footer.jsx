import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Mail, MapPin, Shield, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    company: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Use Cases', path: '/use-cases' },
      { name: 'About', path: '/about' },
      { name: 'FAQ', path: '/faq' },
    ],
    legal: [
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Contact', path: '/contact' },
    ],
    resources: [
      { name: 'API Docs', path: '/api-docs' },
      { name: 'How It Works', path: '/how-it-works' },
    ],
  }

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/">
              <img src="/logo.png" alt="Prime Digits" className="h-20 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Premium virtual phone numbers for secure SMS verification. Reliable, instant, and built for professionals.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a href="https://www.facebook.com/share/1G8dG4ZwXh/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-dark-800 text-gray-400 hover:text-gold-500 hover:bg-dark-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/prime-digits-0a0244411" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-dark-800 text-gray-400 hover:text-gold-500 hover:bg-dark-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="mailto:support@primesdigits.com" className="p-2 rounded-lg bg-dark-800 text-gray-400 hover:text-gold-500 hover:bg-dark-700 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              {links.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              {links.legal.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-gold-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              {links.resources.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-gold-500 transition-colors flex items-center">
                    {link.name}
                    {link.path === '/api-docs' && <ExternalLink className="w-3 h-3 ml-1" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Addresses & EIN */}
        <div className="mt-10 pt-8 border-t border-dark-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              <span className="text-gray-400 font-medium">US HQ:</span> 518 Magnolia Dr, Osceola, AR 72370
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              <span className="text-gray-400 font-medium">UK Office:</span> 39 Ludgate Hill, London, EC4M 7JN
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <Shield className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500">
              <span className="text-gray-400 font-medium">EIN:</span> 42-2601844
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Prime Digits. All rights reserved. Prime Digits is a registered US business.
          </p>
          <p className="text-sm text-gray-500">
            support@primesdigits.com
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
