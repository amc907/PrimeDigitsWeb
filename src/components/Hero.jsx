import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import Button from './ui/Button'

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Instant Activation Worldwide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Premium Virtual Phone Numbers for{' '}
            <span className="text-gold-500">SMS Verification</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Get secure, reliable virtual numbers instantly. Perfect for business verification, 
            two-factor authentication, and protecting your privacy online.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500 text-sm">
            <span className="flex items-center"><Shield className="w-4 h-4 mr-1.5 text-gold-500" /> Secure</span>
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1.5 text-gold-500" /> Instant</span>
            <span className="flex items-center"><Globe className="w-4 h-4 mr-1.5 text-gold-500" /> Global</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
