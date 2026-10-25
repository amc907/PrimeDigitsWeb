import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Theme-able colors are CSS variables (see index.css) so light mode can swap them
      colors: {
        white: 'rgb(var(--white) / <alpha-value>)',
        red: { ...colors.red, 300: 'rgb(var(--red-300) / <alpha-value>)', 400: 'rgb(var(--red-400) / <alpha-value>)' },
        yellow: { ...colors.yellow, 300: 'rgb(var(--yellow-300) / <alpha-value>)', 400: 'rgb(var(--yellow-400) / <alpha-value>)' },
        green: { ...colors.green, 300: 'rgb(var(--green-300) / <alpha-value>)', 400: 'rgb(var(--green-400) / <alpha-value>)' },
        blue: { ...colors.blue, 300: 'rgb(var(--blue-300) / <alpha-value>)', 400: 'rgb(var(--blue-400) / <alpha-value>)' },
        purple: { ...colors.purple, 300: 'rgb(var(--purple-300) / <alpha-value>)', 400: 'rgb(var(--purple-400) / <alpha-value>)' },
        orange: { ...colors.orange, 300: 'rgb(var(--orange-300) / <alpha-value>)', 400: 'rgb(var(--orange-400) / <alpha-value>)' },
        gold: {
          50: '#fdf9f0',
          100: '#fbf0d9',
          200: '#f6e0b3',
          300: 'rgb(var(--gold-300) / <alpha-value>)',
          400: 'rgb(var(--gold-400) / <alpha-value>)',
          500: 'rgb(var(--gold-500) / <alpha-value>)',
          600: '#b87d22',
          700: '#94601d',
          800: '#7a4d1e',
          900: '#66401c',
        },
        gray: {
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
        },
        dark: {
          50: 'rgb(var(--dark-50) / <alpha-value>)',
          100: 'rgb(var(--dark-100) / <alpha-value>)',
          200: 'rgb(var(--dark-200) / <alpha-value>)',
          300: 'rgb(var(--dark-300) / <alpha-value>)',
          400: 'rgb(var(--dark-400) / <alpha-value>)',
          500: 'rgb(var(--dark-500) / <alpha-value>)',
          600: 'rgb(var(--dark-600) / <alpha-value>)',
          700: 'rgb(var(--dark-700) / <alpha-value>)',
          800: 'rgb(var(--dark-800) / <alpha-value>)',
          900: 'rgb(var(--dark-900) / <alpha-value>)',
          950: 'rgb(var(--dark-950) / <alpha-value>)',
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
