import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, MessageSquare, CreditCard, Shield,
  Plus, RefreshCw, History, Headphones, Copy, Trash2,
  Clock, Inbox, Wallet
} from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    activeNumbers: 0,
    smsCredits: 0,
    smsToday: 0,
    accountStatus: 'Active',
  })
  const [numbers, setNumbers] = useState([])
  const [recentSMS, setRecentSMS] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      const myNumbers = await api.getMyNumbers()
      const nums = myNumbers || []
      setNumbers(nums)
      setStats({
        activeNumbers: nums.length || 0,
        smsCredits: nums.reduce((acc, n) => acc + (n.credits || 0), 0) || 0,
        smsToday: nums.reduce((acc, n) => acc + (n.sms_today || 0), 0) || 0,
        accountStatus: 'Active',
      })

      // Load recent SMS from API if available
      try {
        const allSMS = []
        for (const num of nums.slice(0, 3)) {
          const msgs = await api.getSMSHistory(num.id)
          if (msgs && msgs.length > 0) {
            allSMS.push(...msgs.slice(0, 3).map(m => ({
              id: m.id,
              from: m.from_number,
              preview: m.message?.slice(0, 60) + (m.message?.length > 60 ? '...' : ''),
              time: m.created_at,
              status: m.status || 'delivered',
              number: num.phone_number,
            })))
          }
        }
        setRecentSMS(allSMS.slice(0, 5))
      } catch (smsErr) {
        setRecentSMS([])
      }

      // Load recent transactions from API if available
      try {
        const txs = await api.getTransactions?.()
        setRecentTransactions((txs || []).slice(0, 5))
      } catch (txErr) {
        setRecentTransactions([])
      }
    } catch (err) {
      // Silent fail - show empty state
      setNumbers([])
      setStats({ activeNumbers: 0, smsCredits: 0, smsToday: 0, accountStatus: 'Active' })
      setRecentSMS([])
      setRecentTransactions([])
    } finally {
      setIsLoading(false)
    }
  }

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number)
    toast.success('Number copied to clipboard')
  }

  const handleDelete = async (numberId) => {
    if (!confirm('Are you sure you want to delete this number?')) return
    try {
      await api.deleteNumber(numberId)
      toast.success('Number deleted')
      loadDashboardData()
    } catch (err) {
      toast.error('Failed to delete number')
    }
  }

  const getCountryFlag = (country) => {
    const flags = { US: '🇺🇸', CA: '🇨🇦', USA: '🇺🇸', CANADA: '🇨🇦', 'UNITED STATES': '🇺🇸' }
    return flags[country?.toUpperCase()] || '🌍'
  }

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return 0
    const diff = new Date(expiryDate) - new Date()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const getStatusBadge = (daysLeft) => {
    if (daysLeft <= 0) return <Badge variant="danger">Expired</Badge>
    if (daysLeft <= 3) return <Badge variant="danger">Expiring Soon</Badge>
    if (daysLeft <= 7) return <Badge variant="warning">Expiring Soon</Badge>
    return <Badge variant="success">Active</Badge>
  }

  const expiringSoon = numbers.filter(n => getDaysRemaining(n.expires_at) <= 7 && getDaysRemaining(n.expires_at) > 0)
  const criticalExpiry = numbers.filter(n => getDaysRemaining(n.expires_at) <= 3 && getDaysRemaining(n.expires_at) > 0)

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
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
          </h1>
          <p className="mt-1 text-gray-400">Here is what is happening with your account.</p>
        </div>

        {/* Expiry Warnings */}
        {criticalExpiry.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start space-x-3">
            <div className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">⚠️</div>
            <div>
              <p className="text-red-400 font-medium">Critical: Numbers expiring within 3 days</p>
              <p className="text-red-300/70 text-sm mt-1">
                {criticalExpiry.map(n => n.phone_number).join(', ')} — Renew now to avoid losing your numbers.
              </p>
            </div>
          </div>
        )}
        {expiringSoon.length > 0 && criticalExpiry.length === 0 && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start space-x-3">
            <div className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5">⚠️</div>
            <div>
              <p className="text-yellow-400 font-medium">Warning: Numbers expiring within 7 days</p>
              <p className="text-yellow-300/70 text-sm mt-1">
                {expiringSoon.map(n => n.phone_number).join(', ')} — Consider renewing soon.
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Numbers', value: stats.activeNumbers, icon: Phone, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'SMS Credits', value: stats.smsCredits, icon: CreditCard, color: 'text-gold-400', bg: 'bg-gold-500/10' },
            { label: 'SMS Received Today', value: stats.smsToday, icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-500/10' },
            { label: 'Account Status', value: stats.accountStatus, icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          ].map((stat, i) => (
            <Card key={i} className="p-5 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Numbers */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Active Numbers</CardTitle>
                <Link to="/numbers">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {numbers.length === 0 ? (
                  <div className="text-center py-10">
                    <Phone className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">You have no active numbers yet.</p>
                    <p className="text-sm text-gray-500 mt-1">Click Buy Number to get started!</p>
                    <Link to="/buy" className="mt-4 inline-block">
                      <Button variant="primary" size="sm">
                        <Plus className="w-4 h-4 mr-1" /> Buy Number
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {numbers.map((number) => {
                      const daysLeft = getDaysRemaining(number.expires_at)
                      const creditPercent = Math.min(100, Math.max(0, (number.credits / 50) * 100))
                      return (
                        <div key={number.id} className="p-4 bg-dark-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{getCountryFlag(number.country)}</span>
                              <div>
                                <p className="text-white font-medium">{number.phone_number}</p>
                                <div className="flex items-center space-x-2 mt-0.5">
                                  <Clock className="w-3 h-3 text-gray-500" />
                                  <p className="text-xs text-gray-400">{daysLeft} days left</p>
                                </div>
                              </div>
                            </div>
                            {getStatusBadge(daysLeft)}
                          </div>

                          {/* Credits Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-400">Credits</span>
                              <span className="text-gray-300">{number.credits || 0} remaining</span>
                            </div>
                            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  creditPercent < 20 ? 'bg-red-500' : creditPercent < 50 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${creditPercent}%` }}
                              />
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <Link to={`/sms-inbox?number=${number.id}`}>
                              <Button variant="secondary" size="sm" className="w-full">
                                <Inbox className="w-3.5 h-3.5 mr-1" /> View SMS
                              </Button>
                            </Link>
                            <Link to="/buy">
                              <Button variant="secondary" size="sm" className="w-full">
                                <RefreshCw className="w-3.5 h-3.5 mr-1" /> Renew
                              </Button>
                            </Link>
                            <Link to="/credits">
                              <Button variant="secondary" size="sm" className="w-full">
                                <CreditCard className="w-3.5 h-3.5 mr-1" /> Top Up
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full" onClick={() => handleDelete(number.id)}>
                              <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Recent SMS Activity</CardTitle>
                <Link to="/sms-inbox">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentSMS.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">No recent SMS</div>
                ) : (
                  <div className="space-y-3">
                    {recentSMS.map((sms) => (
                      <div key={sms.id} className="flex items-start justify-between p-3 bg-dark-800/50 rounded-lg">
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-white font-medium text-sm">{sms.from}</p>
                            <span className="text-xs text-gray-500">→ {sms.number}</span>
                          </div>
                          <p className="text-gray-400 text-sm truncate">{sms.preview}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xs text-gray-500">{sms.time}</p>
                          <Badge variant="success" className="mt-1">Delivered</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Link to="/transactions">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentTransactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">No recent transactions</div>
                ) : (
                  <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-dark-800">
                            <Wallet className="w-4 h-4 text-gold-500" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{tx.type}</p>
                            <p className="text-xs text-gray-500">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium text-sm">${tx.amount?.toFixed(2)}</p>
                          <Badge variant="success" className="text-xs">{tx.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            {[
              { icon: Plus, label: 'Buy New Number', desc: 'Get a new virtual number', to: '/buy', variant: 'primary' },
              { icon: CreditCard, label: 'Buy SMS Credits', desc: 'Top up your credits', to: '/credits', variant: 'secondary' },
              { icon: Inbox, label: 'View SMS Inbox', desc: 'Real-time message feed', to: '/sms-inbox', variant: 'secondary' },
              { icon: Headphones, label: 'Contact Support', desc: 'Get help from our team', to: '/support', variant: 'secondary' },
            ].map((action, i) => (
              <Link key={i} to={action.to}>
                <Card className="p-4 hover:border-gold-500/30 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-dark-800 group-hover:bg-gold-500/10 transition-colors">
                      <action.icon className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{action.label}</p>
                      <p className="text-xs text-gray-400">{action.desc}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
