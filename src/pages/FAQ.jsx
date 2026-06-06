import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is a virtual phone number?',
      answer: 'A virtual phone number is a telephone number that is not directly associated with a telephone line. You can use it to receive SMS messages online without needing a physical SIM card or phone.',
    },
    {
      question: 'How quickly is my number activated?',
      answer: 'Numbers are activated instantly after purchase. You can start using your virtual number for SMS verification immediately.',
    },
    {
      question: 'Which countries are available?',
      answer: 'We currently offer virtual numbers from the United States and Canada. We are continuously expanding to more regions.'
    },
    {
      question: 'Can I receive SMS from any service?',
      answer: 'Our numbers can receive SMS from most services and platforms. However, some services may block virtual numbers. We recommend testing with your specific use case.',
    },
    {
      question: 'How long do I keep my number?',
      answer: 'You keep your number for the duration of your purchased plan — daily, weekly, or monthly. You can renew or extend at any time from your dashboard.',
    },
    {
      question: 'What happens to my SMS history?',
      answer: 'Your SMS history is stored securely and accessible from your dashboard for the duration of your active plan. Extended history is available with monthly plans.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption for all data. Your messages and personal information are never shared with third parties.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards through our secure payment processor. Additional payment methods will be added soon.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Due to the instant nature of our service, refunds are evaluated on a case-by-case basis. Please contact support within 24 hours of purchase if you experience issues.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Support page in your dashboard, or by emailing support@primesdigits.com. We typically respond within a few hours.',
    },
  ]

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to know about PrimeDigits.
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
                <ChevronDown className={`w-5 h-5 text-gold-500 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
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
          <p className="text-gray-400">Still have questions?</p>
          <a href="/contact" className="mt-2 inline-flex items-center text-gold-500 hover:text-gold-400 font-medium transition-colors">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ
