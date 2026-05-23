import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MessageSquare, ChevronDown } from 'lucide-react'
import { api } from '../lib/api'
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const SMSHistory = () => {
  const [searchParams] = useSearchParams()
  const [numbers, setNumbers] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(searchParams.get('number') || '')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadNumbers()
  }, [])

  useEffect(() => {
    if (selectedNumber) {
      loadMessages(selectedNumber)
    }
  }, [selectedNumber])

  const loadNumbers = async () => {
    try {
      const data = await api.getMyNumbers()
      const nums = data || []
      setNumbers(nums)
      if (!selectedNumber && nums.length > 0) {
        setSelectedNumber(nums[0].id.toString())
      }
    } catch (err) {
      setNumbers([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadMessages = async (numberId) => {
    setIsLoading(true)
    try {
      const data = await api.getSMSHistory(numberId)
      setMessages(data || [])
    } catch (err) {
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const selectedNumberData = numbers.find(n => n.id.toString() === selectedNumber)

  if (isLoading && messages.length === 0 && numbers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">SMS History</h1>
          <p className="mt-1 text-gray-400">View messages received by your numbers</p>
        </div>

        {numbers.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">📭 No messages yet</p>
            <p className="text-sm text-gray-500 mt-1">Your SMS messages will appear here once you have an active number.</p>
          </Card>
        ) : (
          <>
            {/* Number Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Number</label>
              <div className="relative">
                <select
                  value={selectedNumber}
                  onChange={(e) => setSelectedNumber(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                >
                  {numbers.map((number) => (
                    <option key={number.id} value={number.id}>
                      {number.phone_number} ({number.country})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Messages Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-gold-500" />
                  <span>Messages for {selectedNumberData?.phone_number || 'Selected Number'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No messages yet</p>
                    <p className="text-sm text-gray-500 mt-1">Messages will appear here when received</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark-800">
                          <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">From</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">Message</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider pb-3 pr-4">Date</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-800">
                        {messages.map((msg) => (
                          <tr key={msg.id} className="group hover:bg-dark-800/30 transition-colors">
                            <td className="py-4 pr-4">
                              <span className="text-white font-medium text-sm">{msg.from_number}</span>
                            </td>
                            <td className="py-4 pr-4">
                              <p className="text-gray-300 text-sm max-w-xs truncate">{msg.message}</p>
                            </td>
                            <td className="py-4 pr-4">
                              <span className="text-gray-400 text-sm">{formatDate(msg.created_at)}</span>
                            </td>
                            <td className="py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-500/10 text-green-400 border-green-500/20">
                                {msg.status || 'delivered'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default SMSHistory
