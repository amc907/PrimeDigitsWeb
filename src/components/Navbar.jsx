import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, User, Mail } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from './ui/Button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowProfileMenu(false)
  }, [location])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ]

  const dashboardLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'SMS Inbox', path: '/sms-inbox', icon: Mail },
    { name: 'My Numbers', path: '/numbers' },
    { name: 'Buy Number', path: '/buy' },
    { name: 'Credits', path: '/credits' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Profile', path: '/profile' },
  ]

  const links = isAuthenticated ? dashboardLinks : publicLinks

  // Real unread count - default 0, no badge unless there are real unread messages
  const unreadCount = 0

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
            <img src="/logo.png" alt="Prime Digits" className="h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-gold-500 bg-gold-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                <span className="flex items-center">
                  {link.name}
                  {link.name === 'SMS Inbox' && unreadCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-gold-500 text-white text-[10px] font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-900 border border-dark-800 rounded-lg shadow-xl animate-fade-in">
                    <Link to="/profile" className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-dark-800 rounded-t-lg">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-dark-800 rounded-b-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-dark-950/98 backdrop-blur-md border-b border-dark-800 animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-gold-500 bg-gold-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4 mr-2" />}
                {link.name}
                {link.name === 'SMS Inbox' && unreadCount > 0 && (
                  <span className="ml-auto px-1.5 py-0.5 bg-gold-500 text-white text-[10px] font-bold rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800">
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-dark-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2">
                <Link to="/login" className="block w-full">
                  <Button variant="ghost" className="w-full">Log In</Button>
                </Link>
                <Link to="/register" className="block w-full">
                  <Button variant="primary" className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
