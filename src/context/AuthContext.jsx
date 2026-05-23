import React, { createContext, useState, useEffect, useCallback } from 'react'
import { supabase, signInWithEmail, signUpWithEmail, signOut, getCurrentUser } from '../lib/supabase'
import { api } from '../lib/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.access_token) {
        localStorage.setItem('primedigits_token', session.access_token)
      }
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.access_token) {
        localStorage.setItem('primedigits_token', session.access_token)
      } else {
        localStorage.removeItem('primedigits_token')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await signInWithEmail(email, password)
    // Store Supabase token
    if (data?.session?.access_token) {
      localStorage.setItem('primedigits_token', data.session.access_token)
    }
    // Optionally sync with backend (don't block if backend is down)
    try {
      const backendData = await api.login(email, password)
      if (backendData?.token) {
        localStorage.setItem('primedigits_token', backendData.token)
      }
    } catch (err) {
      console.warn('Backend login failed:', err.message)
    }
    return data
  }, [])

  const register = useCallback(async (email, password, fullName) => {
    // Register with Supabase only — do NOT auto-login
    const data = await signUpWithEmail(email, password, { full_name: fullName })

    // Do NOT store any token from registration — user must verify email first
    // The session returned by signUp (if any) should be ignored until email is confirmed

    // Optionally sync with backend (don't block if backend is down)
    try {
      await api.register(email, password, fullName)
    } catch (err) {
      console.warn('Backend registration failed:', err.message)
    }

    return data
  }, [])

  const logout = useCallback(async () => {
    await signOut()
    localStorage.removeItem('primedigits_token')
    setUser(null)
    setSession(null)
  }, [])

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
