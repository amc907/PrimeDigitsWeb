import React, { useState } from 'react'
import { Mail, MessageSquare, Clock, Send, MapPin } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Message sent successfully! We will get back to you within 24 hours.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsLoading(false)
  }

  return (
    <div className="pt-24 pb-20 lg:pt-32 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-400">
            Have a question or need help? We are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            <Card className="p-5">
              <Mail className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium">Email Us</h3>
              <p className="mt-1 text-sm text-gray-400">support@primesdigits.com</p>
            </Card>
            <Card className="p-5">
              <Clock className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium">Response Time</h3>
              <p className="mt-1 text-sm text-gray-400">Within 24 hours</p>
            </Card>
            <Card className="p-5">
              <MessageSquare className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium">Business Hours</h3>
              <p className="mt-1 text-sm text-gray-400">Monday - Friday<br />9am - 6pm GMT</p>
            </Card>
            <Card className="p-5">
              <MapPin className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium">US Address</h3>
              <p className="mt-1 text-sm text-gray-400">
                518 Magnolia Dr<br />
                Osceola, AR 72370<br />
                United States
              </p>
            </Card>
            <Card className="p-5">
              <MapPin className="w-6 h-6 text-gold-500 mb-3" />
              <h3 className="text-white font-medium">UK Address</h3>
              <p className="mt-1 text-sm text-gray-400">
                39 Ludgate Hill<br />
                London, EC4M 7JN<br />
                United Kingdom
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" isLoading={isLoading} className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
