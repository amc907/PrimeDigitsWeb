import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  MessageSquare, Copy, Search, RefreshCw, Inbox, Hash, ArrowLeft, ChevronDown, Lock,
  Bell, BellRing, BellOff, KeyRound,
} from 'lucide-react'
import { api } from '../lib/api'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-red-500',
  'bg-purple-500', 'bg-pink-500', 'bg-cyan-500', 'bg-amber-500',
]

const avatarColor = (sender = '') => {
  let hash = 0
  for (let i = 0; i < sender.length; i++) hash = (hash * 31 + sender.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const Avatar = ({ sender, size = 'w-10 h-10' }) => {
  const letter = /^[a-z]/i.test(sender || '') ? sender[0].toUpperCase() : null
  return (
    <div className={`${size} rounded-full ${avatarColor(sender)} flex items-center justify-center text-[#fff] font-bold flex-shrink-0`}>
      {letter || <Hash className="w-4 h-4" />}
    </div>
  )
}

const extractCode = (text = '') => {
  const match = text.match(/\b\d{4,8}\b/) || text.match(/\b\d{3}-\d{3}\b/)
  return match ? match[0] : null
}

const isSameDay = (a, b) => a.toDateString() === b.toDateString()

const formatListTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  if (isSameDay(date, now)) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (isSameDay(date, yesterday)) return 'Yesterday'
  if (now - date < 7 * 24 * 60 * 60 * 1000) return date.toLocaleDateString('en-US', { weekday: 'short' })
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatDayDivider = (date) => {
  const now = new Date()
  if (isSameDay(date, now)) return 'Today'
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (isSameDay(date, yesterday)) return 'Yesterday'
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

const timeAgo = (dateString) => {
  const minutes = Math.floor((Date.now() - new Date(dateString)) / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  return `${Math.floor(minutes / 60)} hr ago`
}

// Codes older than this are probably used already, so the big code card hides
const LATEST_CODE_WINDOW_MS = 30 * 60 * 1000

const getNotificationPermission = () =>
  typeof Notification === 'undefined' ? 'unsupported' : Notification.permission

const getCountryFlag = (country) => {
  const flags = { US: '🇺🇸', CA: '🇨🇦', USA: '🇺🇸', CANADA: '🇨🇦' }
  return flags[country?.toUpperCase()] || '🌍'
}

const SMSInbox = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [numbers, setNumbers] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSender, setActiveSender] = useState(null)
  const [unreadMap, setUnreadMap] = useState({})
  const [showNumberMenu, setShowNumberMenu] = useState(false)
  const [notifPermission, setNotifPermission] = useState(getNotificationPermission)
  const activeSenderRef = useRef(null)
  const selectedNumberRef = useRef(null)
  const messagesRef = useRef([])
  const notifPermissionRef = useRef(notifPermission)
  const baseTitleRef = useRef(document.title)
  const threadEndRef = useRef(null)

  activeSenderRef.current = activeSender
  selectedNumberRef.current = selectedNumber
  notifPermissionRef.current = notifPermission

  useEffect(() => {
    loadNumbers()
  }, [])

  useEffect(() => {
    if (!selectedNumber) return
    messagesRef.current = []
    setMessages([])
    setActiveSender(null)
    setUnreadMap({})
    fetchSMS(selectedNumber)
    const interval = setInterval(() => fetchSMS(selectedNumber, true), 10000)
    return () => clearInterval(interval)
  }, [selectedNumber])

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ block: 'end' })
  }, [activeSender, messages.length])

  // Show the unread count in the browser tab, e.g. "(2) PrimeDigits"
  useEffect(() => {
    const total = Object.values(unreadMap).reduce((a, b) => a + b, 0)
    document.title = total > 0 ? `(${total}) ${baseTitleRef.current}` : baseTitleRef.current
  }, [unreadMap])

  useEffect(() => {
    const baseTitle = baseTitleRef.current
    return () => { document.title = baseTitle }
  }, [])

  // Coming back to the tab marks the open conversation as read
  useEffect(() => {
    const onVisible = () => {
      const sender = activeSenderRef.current
      if (!document.hidden && sender) setUnreadMap(prev => ({ ...prev, [sender]: 0 }))
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  const loadNumbers = async () => {
    try {
      const data = await api.getMyNumbers()
      const nums = data || []
      setNumbers(nums)
      if (nums.length > 0) {
        const requested = searchParams.get('number')
        const match = nums.find(n => n.id.toString() === requested)
        setSelectedNumber((match || nums[0]).id.toString())
      }
    } catch (err) {
      setNumbers([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSMS = async (numberId, silent = false) => {
    if (silent) setIsRefreshing(true)
    else setIsLoading(true)
    try {
      const data = await api.getSMSHistory(numberId)
      // Ignore late responses for a number the user already switched away from
      if (numberId !== selectedNumberRef.current) return
      const newMessages = data || []
      const prev = messagesRef.current
      // Only count arrivals after the first load
      if (prev.length > 0) {
        const prevIds = new Set(prev.map(m => m.id))
        const added = newMessages.filter(m => !prevIds.has(m.id))
        if (added.length > 0) handleArrivals(added)
      }
      messagesRef.current = newMessages
      setMessages(newMessages)
    } catch (err) {
      if (!silent) setMessages([])
    } finally {
      if (silent) setIsRefreshing(false)
      else setIsLoading(false)
    }
  }

  const handleArrivals = (added) => {
    const hidden = document.hidden
    // The open thread counts as read unless the tab is in the background
    const counted = added.filter(m => hidden || m.from_number !== activeSenderRef.current)
    if (counted.length > 0) {
      setUnreadMap(u => {
        const next = { ...u }
        counted.forEach(m => { next[m.from_number] = (next[m.from_number] || 0) + 1 })
        return next
      })
    }

    if (hidden && notifPermissionRef.current === 'granted') {
      const latest = added[added.length - 1]
      const code = extractCode(latest.message)
      const notification = new Notification(
        added.length > 1 ? `${added.length} new texts` : `New text from ${latest.from_number}`,
        {
          body: code ? `Code: ${code} · ${latest.message}` : latest.message,
          icon: '/icons/icon-192.png',
          tag: 'primedigits-sms',
        }
      )
      notification.onclick = () => {
        window.focus()
        openConversation(latest.from_number)
        notification.close()
      }
    }
  }

  const enableAlerts = async () => {
    if (notifPermission !== 'default') return
    const result = await Notification.requestPermission()
    setNotifPermission(result)
    if (result === 'granted') toast.success("Alerts on. We'll notify you when a text arrives.")
  }

  const conversations = useMemo(() => {
    const groups = {}
    messages.forEach(msg => {
      const sender = msg.from_number || 'Unknown'
      if (!groups[sender]) groups[sender] = []
      groups[sender].push(msg)
    })
    return Object.entries(groups)
      .map(([sender, msgs]) => {
        const sorted = [...msgs].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        return { sender, messages: sorted, last: sorted[sorted.length - 1] }
      })
      .sort((a, b) => new Date(b.last.created_at) - new Date(a.last.created_at))
  }, [messages])

  const filteredConversations = conversations.filter(c => {
    const q = searchQuery.toLowerCase()
    return c.sender.toLowerCase().includes(q) || c.messages.some(m => m.message?.toLowerCase().includes(q))
  })

  const latestCode = useMemo(() => {
    const newestFirst = [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    for (const msg of newestFirst) {
      const code = extractCode(msg.message)
      if (code) return { code, msg }
    }
    return null
  }, [messages])
  const showLatestCode = latestCode && Date.now() - new Date(latestCode.msg.created_at) < LATEST_CODE_WINDOW_MS

  const activeConversation = conversations.find(c => c.sender === activeSender)
  const selectedNumberData = numbers.find(n => n.id.toString() === selectedNumber)

  const openConversation = (sender) => {
    setActiveSender(sender)
    setUnreadMap(prev => ({ ...prev, [sender]: 0 }))
  }

  const copyToClipboard = (text, label = 'Copied to clipboard') => {
    navigator.clipboard.writeText(text)
    toast.success(label)
  }

  if (isLoading && numbers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  if (numbers.length === 0) {
    return (
      <div className="pt-24 pb-20 lg:pt-28 lg:pb-28 animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center">
            <Inbox className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No number yet</h3>
            <p className="text-gray-400 mb-2">Get a number and your texts will show up here like a messaging app.</p>
            <button
              onClick={() => navigate('/buy')}
              className="mt-4 inline-flex items-center px-6 py-3 bg-gold-500 hover:bg-gold-600 text-[#fff] font-medium rounded-lg transition-colors"
            >
              Get a Number
            </button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-6 lg:pt-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[calc(100vh-7rem)] lg:h-[calc(100vh-8rem)] min-h-[520px] rounded-2xl border border-dark-800 bg-dark-900 overflow-hidden shadow-xl shadow-black/20">

          {/* ── Conversation list ── */}
          <aside className={`${activeSender ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-dark-800`}>
            {/* Number switcher */}
            <div className="relative px-4 pt-4 pb-3 border-b border-dark-800">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => numbers.length > 1 && setShowNumberMenu(!showNumberMenu)}
                  className="flex-1 min-w-0 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl">{getCountryFlag(selectedNumberData?.country)}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-500">My number</p>
                      <p className="text-white font-bold tracking-wide truncate">{selectedNumberData?.phone_number}</p>
                    </div>
                  </div>
                  {numbers.length > 1 && (
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showNumberMenu ? 'rotate-180' : ''}`} />
                  )}
                </button>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <RefreshCw className={`w-4 h-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {notifPermission === 'default' && (
                    <button
                      onClick={enableAlerts}
                      title="Get a browser alert when a text arrives"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold text-gold-400 bg-gold-500/10 border border-gold-500/20 hover:bg-gold-500/20"
                    >
                      <Bell className="w-3.5 h-3.5" /> Alerts
                    </button>
                  )}
                  {notifPermission === 'granted' && (
                    <span title="Alerts are on"><BellRing className="w-4 h-4 text-green-400" /></span>
                  )}
                  {notifPermission === 'denied' && (
                    <span title="Alerts are blocked in your browser settings"><BellOff className="w-4 h-4 text-gray-500" /></span>
                  )}
                </div>
              </div>
              {showNumberMenu && (
                <div className="absolute left-4 right-4 top-full mt-1 z-20 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                  {numbers.map(number => (
                    <button
                      key={number.id}
                      onClick={() => { setSelectedNumber(number.id.toString()); setShowNumberMenu(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-dark-700 ${
                        selectedNumber === number.id.toString() ? 'text-gold-400' : 'text-gray-200'
                      }`}
                    >
                      <span>{getCountryFlag(number.country)}</span>
                      {number.phone_number}
                    </button>
                  ))}
                </div>
              )}

              {/* Search */}
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search conversations"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                />
              </div>
            </div>

            {/* Latest verification code */}
            {showLatestCode && (
              <div className="mx-4 mt-3 p-3 rounded-xl bg-gold-500/10 border border-gold-500/25">
                <div className="flex items-center justify-between gap-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1 font-semibold text-gold-400 uppercase tracking-wider">
                    <KeyRound className="w-3.5 h-3.5" /> Latest code
                  </span>
                  <span className="truncate">{latestCode.msg.from_number} · {timeAgo(latestCode.msg.created_at)}</span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-1.5">
                  <span className="text-3xl font-extrabold tracking-[0.2em] text-white">{latestCode.code}</span>
                  <button
                    onClick={() => copyToClipboard(latestCode.code, `Code ${latestCode.code} copied`)}
                    className="inline-flex items-center px-3 py-2 rounded-lg bg-gold-500 hover:bg-gold-600 text-[#fff] text-sm font-semibold transition-colors"
                  >
                    <Copy className="w-4 h-4 mr-1.5" /> Copy
                  </button>
                </div>
              </div>
            )}

            {/* Threads */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-48">
                  <LoadingSpinner size="lg" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-600 mb-3" />
                  <p className="text-gray-300 font-medium">{searchQuery ? 'No matches' : 'No messages yet'}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {searchQuery ? 'Try a different search.' : 'Texts sent to your number will appear here.'}
                  </p>
                </div>
              ) : (
                filteredConversations.map(conv => {
                  const unread = unreadMap[conv.sender] || 0
                  const isActive = conv.sender === activeSender
                  return (
                    <button
                      key={conv.sender}
                      onClick={() => openConversation(conv.sender)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2 ${
                        isActive ? 'bg-gold-500/10 border-gold-500' : 'border-transparent hover:bg-dark-800/60'
                      }`}
                    >
                      <Avatar sender={conv.sender} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm truncate ${unread ? 'text-white font-semibold' : 'text-gray-200 font-medium'}`}>
                            {conv.sender}
                          </p>
                          <span className={`text-xs flex-shrink-0 ${unread ? 'text-gold-400' : 'text-gray-500'}`}>
                            {formatListTime(conv.last.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <p className={`text-[13px] truncate ${unread ? 'text-gray-300' : 'text-gray-500'}`}>{conv.last.message}</p>
                          {unread > 0 && (
                            <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 bg-gold-500 text-dark-900 text-[11px] font-bold rounded-full flex items-center justify-center">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </aside>

          {/* ── Thread view ── */}
          <section className={`${activeSender ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-w-0`}>
            {!activeConversation ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-gold-500" />
                </div>
                <p className="text-white font-semibold">Select a conversation</p>
                <p className="text-sm text-gray-500 mt-1">Pick a sender on the left to read their messages.</p>
              </div>
            ) : (
              <>
                {/* Thread header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-800">
                  <button
                    onClick={() => setActiveSender(null)}
                    className="md:hidden p-1.5 -ml-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <Avatar sender={activeConversation.sender} size="w-9 h-9" />
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">{activeConversation.sender}</p>
                    <p className="text-xs text-gray-500">
                      {activeConversation.messages.length} message{activeConversation.messages.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>

                {/* Bubbles */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-dark-950/40">
                  {activeConversation.messages.map((msg, i) => {
                    const date = new Date(msg.created_at)
                    const prev = activeConversation.messages[i - 1]
                    const showDivider = !prev || !isSameDay(new Date(prev.created_at), date)
                    const code = extractCode(msg.message)
                    return (
                      <React.Fragment key={msg.id}>
                        {showDivider && (
                          <p className="text-center text-[11px] text-gray-500 py-2">{formatDayDivider(date)}</p>
                        )}
                        <div className="flex flex-col items-start group">
                          <div className="max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-dark-800 text-gray-100 text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                            {msg.message}
                          </div>
                          <div className="flex items-center gap-2 mt-1 ml-1">
                            <span className="text-[11px] text-gray-500">
                              {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </span>
                            {code && (
                              <button
                                onClick={() => copyToClipboard(code, `Code ${code} copied`)}
                                className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 rounded-full border border-gold-500/20 transition-colors"
                              >
                                <Hash className="w-3 h-3 mr-0.5" /> Copy {code}
                              </button>
                            )}
                            <button
                              onClick={() => copyToClipboard(msg.message)}
                              className="inline-flex items-center px-2 py-0.5 text-[11px] text-gray-400 hover:text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            >
                              <Copy className="w-3 h-3 mr-0.5" /> Copy
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })}
                  <div ref={threadEndRef} />
                </div>

                {/* Footer: this number receives texts only */}
                <div className="px-4 py-3 border-t border-dark-800 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3.5 h-3.5" />
                  This number receives texts. Replies aren't supported yet.
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default SMSInbox
