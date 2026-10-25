import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // `white` is the main text color and the `dark-*` scale holds the light surfaces
      // (white cards, lavender page, soft borders); existing class names stay unchanged.
      colors: {
        white: '#14121f',
        red: { ...colors.red, 300: '#b91c1c', 400: '#dc2626' },
        yellow: { ...colors.yellow, 300: '#a16207', 400: '#a16207' },
        green: { ...colors.green, 300: '#15803d', 400: '#16a34a' },
        blue: { ...colors.blue, 300: '#1d4ed8', 400: '#2563eb' },
        purple: { ...colors.purple, 300: '#7e22ce', 400: '#9333ea' },
        orange: { ...colors.orange, 300: '#c2410c', 400: '#ea580c' },
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#7c3aed',
          400: '#6d28d9',
          500: '#6d28d9',
          600: '#5b21b6',
          700: '#4c1d95',
          800: '#3b0764',
          900: '#2e1065',
        },
        gray: {
          50: '#111827',
          100: '#1f2937',
          200: '#2d3440',
          300: '#3e4654',
          400: '#58606e',
          500: '#6b7280',
          600: '#949ba8',
          700: '#bec3cc',
          800: '#e2e4e9',
          900: '#f3f4f6',
        },
        dark: {
          50: '#14121f',
          100: '#2a2540',
          200: '#625b7c',
          300: '#7c7596',
          400: '#a09ab8',
          500: '#b9b4cd',
          600: '#cfcbe0',
          700: '#e2dfee',
          800: '#eeecf6',
          900: '#ffffff',
          950: '#f6f5fb',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
