import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is a virtual number?',
      answer: "It's a real phone number that lives online instead of on a SIM card. Texts sent to it show up in your PrimeDigits inbox, on any device.",
    },
    {
      question: 'How fast do I get my number?',
      answer: 'Right away. As soon as your payment goes through, your number is live and ready for texts.',
    },
    {
      question: 'Which countries are available?',
      answer: 'Right now, the United States and Canada. More countries are coming.',
    },
    {
      question: 'Will it work with every app?',
      answer: 'Most apps and websites will send codes to it with no problem. A few services block virtual numbers, so if you need it for one specific app, start with a monthly plan and try it first.',
    },
    {
      question: 'How long do I keep my number?',
      answer: 'For as long as your plan lasts: 1, 3, 6 or 12 months. You can add more text credits anytime from your dashboard.',
    },
    {
      question: 'What happens to my old texts?',
      answer: 'They stay in your inbox for as long as your plan is active.',
    },
    {
      question: 'Is my data safe?',
      answer: 'Yes. Your data is encrypted, and we never share your messages or personal details with anyone.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'All major credit and debit cards, processed securely by Stripe.',
    },
    {
      question: 'Can I get a refund?',
      answer: "Because numbers go live instantly, we look at refunds case by case. If something isn't working, contact support within 24 hours of buying and we'll sort it out.",
    },
    {
      question: 'How do I contact support?',
      answer: 'Use the Support page in your dashboard or email support@primesdigits.com. We usually reply within a few hours.',
    },
  ]

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
