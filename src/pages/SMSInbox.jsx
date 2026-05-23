import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, Copy, Search, RefreshCw, Inbox, Clock, Hash } from 'lucide-react'
import { api } from '../lib/api'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const SMSInbox = () => {
  const navigate = useNavigate()
  const [numbers, setNumbers] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [unreadMap, setUnreadMap] = useState({})

  useEffect(() => {
    loadNumbers()
  }, [])

  useEffect(() => {
    if (selectedNumber) {
      fetchSMS(selectedNumber)
    }
  }, [selectedNumber])

  useEffect(() => {
    if (!selectedNumber) return
    const interval = setInterval(() => {
      fetchSMS(selectedNumber, true)
    }, 10000)
    return () => clearInterval(interval)
  }, [selectedNumber])

  const loadNumbers = async () => {
    try {
      const data = await api.getMyNumbers()
      const nums = data || []
      setNumbers(nums)
      if (nums.length > 0 && !selectedNumber) {
        setSelectedNumber(nums[0].id.toString())
      }
    } catch (err) {
      setNumbers([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSMS = async (numberId, silent = false) => {
    if (!silent) setIsLoading(true)
    try {
      const data = await api.getSMSHistory(numberId)
      const newMessages = data || []
      setMessages(prev => {
        const prevIds = new Set(prev.map(m => m.id))
        const added = newMessages.filter(m => !prevIds.has(m.id))
        if (added.length > 0 && !silent) {
          added.forEach(() => {
            setUnreadMap(u => ({ ...u, [numberId]: (u[numberId] || 0) + 1 }))
          })
        }
        return newMessages
      })
    } catch (err) {
      setMessages([])
    } finally {
      if (!silent) setIsLoading(false)
    }
  }

  const handleNumberClick = (numberId) => {
    setSelectedNumber(numberId)
    setUnreadMap(prev => ({ ...prev, [numberId]: 0 }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const copyCode = (message) => {
    const codeMatch = message.match(/\b\d{4,8}\b/)
    if (codeMatch) {
      navigator.clipboard.writeText(codeMatch[0])
      toast.success(`Code ${codeMatch[0]} copied`)
    } else {
      toast.error('No code found in message')
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) +
      ' · ' + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getCountryFlag = (country) => {
    const flags = { US: '🇺🇸', CA: '🇨🇦', GB: '🇬🇧', USA: '🇺🇸', CANADA: '🇨🇦', UK: '🇬🇧' }
    return flags[country?.toUpperCase()] || '🌍'
  }

  const filteredMessages = messages.filter(msg =>
    msg.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.from_number?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedNumberData = numbers.find(n => n.id.toString() === selectedNumber)

  if (isLoading && numbers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <MessageSquare className="w-7 h-7 mr-3 text-gold-500" />
            SMS Inbox
          </h1>
          <p className="mt-1 text-gray-400">Real-time messages for your active numbers</p>
        </div>

        {numbers.length === 0 ? (
          <Card className="p-12 text-center">
            <Inbox className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">📭 No messages yet</h3>
            <p className="text-gray-400 mb-2">Your SMS messages will appear here once you have an active number.</p>
            <button
              onClick={() => navigate('/buy')}
              className="mt-4 inline-flex items-center px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-lg transition-colors"
            >
              Buy Number
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Numbers */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <div className="p-4 border-b border-dark-800">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Your Numbers</h3>
                </div>
                <div className="divide-y divide-dark-800">
                  {numbers.map((number) => {
                    const unread = unreadMap[number.id] || 0
                    const isSelected = selectedNumber === number.id.toString()
                    return (
                      <button
                        key={number.id}
                        onClick={() => handleNumberClick(number.id.toString())}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                          isSelected ? 'bg-gold-500/10 border-l-2 border-gold-500' : 'hover:bg-dark-800/50 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <span className="text-xl">{getCountryFlag(number.country)}</span>
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate ${isSelected ? 'text-gold-400' : 'text-white'}`}>
                              {number.phone_number}
                            </p>
                            <p className="text-xs text-gray-500">{number.country}</p>
                          </div>
                        </div>
                        {unread > 0 && (
                          <span className="ml-2 flex-shrink-0 px-2 py-0.5 bg-gold-500 text-white text-xs font-semibold rounded-full">
                            {unread}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* Messages Area */}
            <div className="lg:col-span-3">
              <Card className="h-full flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-dark-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getCountryFlag(selectedNumberData?.country)}</span>
                    <div>
                      <p className="text-white font-medium">{selectedNumberData?.phone_number || 'Select a number'}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <RefreshCw className="w-3 h-3 mr-1" /> Auto-refreshes every 10s
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-9 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                    />
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-4 space-y-3 min-h-[400px]">
                  {isLoading && messages.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Inbox className="w-12 h-12 text-gray-600 mb-3" />
                      <p className="text-gray-400 font-medium">📭 No messages yet</p>
                      <p className="text-sm text-gray-500 mt-1">Your SMS messages will appear here once you have an active number.</p>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => (
                      <div key={msg.id} className="p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors group">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-white font-medium text-sm">{msg.from_number}</span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(msg.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-200 text-base leading-relaxed mb-3 whitespace-pre-wrap">{msg.message}</p>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => copyToClipboard(msg.message)}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-300 bg-dark-800 hover:bg-dark-700 rounded transition-colors border border-dark-700"
                          >
                            <Copy className="w-3 h-3 mr-1" /> Copy
                          </button>
                          <button
                            onClick={() => copyCode(msg.message)}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 rounded transition-colors border border-gold-500/20"
                          >
                            <Hash className="w-3 h-3 mr-1" /> Copy Code
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SMSInbox
