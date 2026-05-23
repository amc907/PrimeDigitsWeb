import React from 'react'
import { Star, Quote } from 'lucide-react'
import Card from './ui/Card'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Michael R.',
      role: 'Software Developer',
      content: 'PrimeDigits has been essential for testing our app\'s SMS verification flow. Reliable numbers and instant activation.',
      rating: 5,
    },
    {
      name: 'Sarah L.',
      role: 'Digital Marketer',
      content: 'I use PrimeDigits to manage multiple client accounts without sharing my personal number. The dashboard is intuitive and clean.',
      rating: 5,
    },
    {
      name: 'David K.',
      role: 'Security Consultant',
      content: 'For privacy-conscious professionals, this is the best virtual number service I have used. Great coverage and fair pricing.',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-dark-900/50 border-y border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">What Our Users Say</h2>
          <p className="mt-4 text-gray-400">Trusted by professionals worldwide.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <Quote className="w-8 h-8 text-gold-500/30 mb-4" />
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(t.rating)].map((_, ri) => (
                  <Star key={ri} className="w-4 h-4 text-gold-500 fill-gold-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{t.content}</p>
              <div className="pt-4 border-t border-dark-800">
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
