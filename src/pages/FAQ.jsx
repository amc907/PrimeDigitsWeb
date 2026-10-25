import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faqs'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Questions & answers</h1>
          <p className="mt-4 text-lg text-gray-400">
            Quick answers about numbers, texts and payments.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-dark-800/50 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-brand-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 animate-fade-in">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">Didn't find your answer?</p>
          <a href="/contact" className="mt-2 inline-flex items-center text-brand-400 hover:text-brand-400 font-medium transition-colors">
            Get in touch
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ
