import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Copy, RefreshCw, CreditCard, History, Trash2, Plus } from 'lucide-react'
import { api } from '../lib/api'
import Card, { CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const MyNumbers = () => {
  const [numbers, setNumbers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadNumbers()
  }, [])

  const loadNumbers = async () => {
    try {
      const data = await api.getMyNumbers()
      setNumbers(data || [])
    } catch (err) {
      setNumbers([])
    } finally {
      setIsLoading(false)
    }
  }

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number)
    toast.success('Number copied to clipboard')
  }

  const handleDelete = async (numberId) => {
    if (!confirm('Are you sure you want to delete this number? This action cannot be undone.')) return
    try {
      await api.deleteNumber(numberId)
      toast.success('Number deleted successfully')
      loadNumbers()
    } catch (err) {
      toast.error('Failed to delete number')
    }
  }

  const handleRenew = (numberId) => {
    toast('Renewal feature coming soon')
  }

  const handleTopUp = (numberId) => {
    toast('Top-up feature coming soon')
  }

  const getCountryFlag = (country) => {
    const flags = { US: '🇺🇸', CA: '🇨🇦', GB: '🇬🇧', USA: '🇺🇸', CANADA: '🇨🇦', UK: '🇬🇧' }
    return flags[country?.toUpperCase()] || '🌍'
  }

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0
    const diff = new Date(expiryDate) - new Date()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Numbers</h1>
            <p className="mt-1 text-gray-400">Manage all your virtual numbers</p>
          </div>
          <Link to="/buy">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Buy Number
            </Button>
          </Link>
        </div>

        {numbers.length === 0 ? (
          <Card className="p-12 text-center">
            <Phone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">📱 No active numbers</h3>
            <p className="text-gray-400 mb-6">You haven't purchased any numbers yet.</p>
            <Link to="/buy">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" /> Buy Your First Number
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {numbers.map((number) => {
              const daysLeft = getDaysRemaining(number.expires_at)
              const isExpiringSoon = daysLeft <= 3

              return (
                <Card key={number.id} className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getCountryFlag(number.country)}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-white">{number.phone_number}</h3>
                            <button
                              onClick={() => copyNumber(number.phone_number)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                              title="Copy number"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-400">{number.country}</p>
                        </div>
                      </div>
                      <Badge variant={isExpiringSoon ? 'warning' : 'success'}>
                        {isExpiringSoon ? 'Expiring Soon' : 'Active'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-dark-800/50 rounded-lg">
                        <p className="text-xs text-gray-400">Expires In</p>
                        <p className={`text-sm font-semibold ${isExpiringSoon ? 'text-yellow-400' : 'text-white'}`}>
                          {daysLeft} days
                        </p>
                      </div>
                      <div className="p-3 bg-dark-800/50 rounded-lg">
                        <p className="text-xs text-gray-400">Credits</p>
                        <p className="text-sm font-semibold text-white">{number.credits || 0}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="secondary" size="sm" onClick={() => handleRenew(number.id)}>
                        <RefreshCw className="w-3.5 h-3.5 mr-1" /> Renew
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handleTopUp(number.id)}>
                        <CreditCard className="w-3.5 h-3.5 mr-1" /> Top Up
                      </Button>
                      <Link to={`/history?number=${number.id}`} className="col-span-1">
                        <Button variant="ghost" size="sm" className="w-full">
                          <History className="w-3.5 h-3.5 mr-1" /> History
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => handleDelete(number.id)}>
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyNumbers
