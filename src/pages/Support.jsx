import React, { useState } from 'react'
import { Send, Clock, HelpCircle, Mail, MessageSquare, FileText } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import toast from 'react-hot-toast'

const Support = () => {
  const [formData, setFormData] = useState({ subject: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const faqs = [
    { question: 'How do I activate my number?', answer: 'Numbers are activated automatically after purchase. Go to your dashboard to see your active numbers.' },
    { question: 'Can I renew an expired number?', answer: 'Yes, you can renew numbers from the My Numbers page before or shortly after expiry.' },
    { question: 'How do I buy more credits?', answer: 'Use the Buy SMS Credits quick action on your dashboard or go to the Buy Number page.' },
  ]

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Support ticket submitted! We will respond shortly.')
    setFormData({ subject: '', message: '' })
    setIsLoading(false)
  }

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Support Center</h1>
          <p className="mt-2 text-gray-400">We are here to help. Reach out or browse common questions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-gold-500" />
                  <span>Contact Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What do you need help with?"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your issue in detail..."
                      className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" isLoading={isLoading}>
                    <Send className="w-4 h-4 mr-2" /> Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <Card key={i} className="p-4">
                    <h3 className="text-white font-medium mb-1 flex items-center">
                      <HelpCircle className="w-4 h-4 text-gold-500 mr-2" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <Card className="p-5">
              <Clock className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium mb-1">Response Time</h3>
              <p className="text-sm text-gray-400">We typically respond to support tickets within a few hours during business hours.</p>
            </Card>
            <Card className="p-5">
              <Mail className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium mb-1">Email Support</h3>
              <p className="text-sm text-gray-400">support@primesdigits.com</p>
            </Card>
            <Card className="p-5">
              <FileText className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium mb-1">Documentation</h3>
              <p className="text-sm text-gray-400">Check our FAQ and How It Works pages for quick answers.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
