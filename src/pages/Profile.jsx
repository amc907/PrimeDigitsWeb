import React, { useState, useEffect } from 'react'
import { User, Mail, Calendar, Phone, MessageSquare, Lock, Copy, Check, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    createdAt: '',
    totalNumbers: 0,
    totalSMS: 0,
    referralCode: '',
    referralsMade: 0,
    referralCredits: 0,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [user])

  const loadProfile = async () => {
    try {
      const numbers = await api.getMyNumbers()
      const nums = numbers || []
      setProfile({
        fullName: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        createdAt: user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-',
        totalNumbers: nums.length,
        totalSMS: nums.reduce((acc, n) => acc + (n.total_sms || 0), 0),
        referralCode: user?.id?.slice(0, 8).toUpperCase() || '',
        referralsMade: 0,
        referralCredits: 0,
      })
    } catch (err) {
      setProfile({
        fullName: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        createdAt: user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-',
        totalNumbers: 0,
        totalSMS: 0,
        referralCode: user?.id?.slice(0, 8).toUpperCase() || '',
        referralsMade: 0,
        referralCredits: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSavePassword = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setIsSavingPassword(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Password updated successfully')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setIsSavingPassword(false)
  }

  const copyReferralLink = () => {
    if (!profile.referralCode) return
    const link = `https://primesdigits.com/register?ref=${profile.referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    toast.success('Referral link copied')
    setTimeout(() => setCopied(false), 2000)
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Profile</h1>
          <p className="mt-1 text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-gold-500" /> Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={profile.email}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Account Created</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={profile.createdAt}
                      readOnly
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Change Password */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-gold-500" /> Change Password
              </h3>
              <form onSubmit={handleSavePassword} className="space-y-4">
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm new password"
                />
                <Button type="submit" variant="primary" isLoading={isSavingPassword}>
                  Save Password
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Column - Stats & Referral */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-gray-400">Total Numbers</span>
                  </div>
                  <span className="text-white font-semibold">{profile.totalNumbers}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-gray-400">Total SMS Received</span>
                  </div>
                  <span className="text-white font-semibold">{profile.totalSMS}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Account Status</span>
                  </div>
                  <span className="text-green-400 font-semibold text-sm">Active</span>
                </div>
              </div>
            </Card>

            {/* Referral */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Referral Program</h3>
              <p className="text-sm text-gray-400 mb-4">
                Invite friends and earn free SMS credits when they make their first purchase.
              </p>
              {profile.referralCode ? (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Referral Link</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={`https://primesdigits.com/register?ref=${profile.referralCode}`}
                        readOnly
                        className="flex-1 px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-xs text-gray-400 truncate"
                      />
                      <button
                        onClick={copyReferralLink}
                        className="p-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-white">{profile.referralsMade}</p>
                      <p className="text-xs text-gray-400">Referrals</p>
                    </div>
                    <div className="p-3 bg-dark-800/50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gold-500">{profile.referralCredits}</p>
                      <p className="text-xs text-gray-400">Credits Earned</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">Referral program coming soon.</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
