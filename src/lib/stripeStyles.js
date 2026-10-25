import { useMemo } from 'react'
import { useTheme } from '../hooks/useTheme'

// Stripe's card iframe can't read our CSS variables, so pass real colors per theme
export const useCardElementOptions = () => {
  const { theme } = useTheme()
  return useMemo(() => ({
    style: {
      base: {
        color: theme === 'light' ? '#111118' : '#f3f4f6',
        fontFamily: '"Inter", sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#6b7280',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  }), [theme])
}
