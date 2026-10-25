import React, { createContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'primedigits_theme'

export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch (err) {
    // Storage blocked - fall back to the default
  }
  return 'dark'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', theme === 'light')
    root.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f5f5f7' : '#0f0f12')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (err) {
      // Storage blocked - theme still applies for this visit
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
