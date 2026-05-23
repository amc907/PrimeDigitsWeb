/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9f0',
          100: '#fbf0d9',
          200: '#f6e0b3',
          300: '#ecc975',
          400: '#e3b44f',
          500: '#d49a2e',
          600: '#b87d22',
          700: '#94601d',
          800: '#7a4d1e',
          900: '#66401c',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e1e1e4',
          200: '#c3c3c9',
          300: '#9d9da7',
          400: '#787884',
          500: '#5e5e6b',
          600: '#4a4a56',
          700: '#3e3e47',
          800: '#35353c',
          900: '#1a1a20',
          950: '#0f0f12',
        }
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
