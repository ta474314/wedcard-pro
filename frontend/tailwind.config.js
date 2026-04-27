/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF69B4',
          light: '#ff9bcb',
          dark: '#e8559e',
          50: '#fff0f5',
          100: '#ffe0ed',
          200: '#ffc2db',
          300: '#ffa3c9',
          400: '#ff85b7',
          500: '#FF69B4',
          600: '#e8559e',
          700: '#d14188',
          800: '#ba2d72',
          900: '#a3195c',
        },
        secondary: {
          DEFAULT: '#FFB6C1',
          light: '#ffd1d9',
          dark: '#f09eaa',
          50: '#fff5f6',
          100: '#ffebed',
          200: '#ffd7db',
          300: '#ffc3c9',
          400: '#ffafb7',
          500: '#FFB6C1',
          600: '#f09eaa',
          700: '#e18693',
          800: '#d26e7c',
          900: '#c35665',
        },
        accent: {
          DEFAULT: '#c084fc',
          light: '#d8b4fe',
          dark: '#a855f7',
        },
        dark: {
          DEFAULT: '#1a1a2e',
          light: '#2d2d44',
          dark: '#0f0f1a',
        },
        gold: {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#d97706',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out',
        'fade-left': 'fadeLeft 0.8s ease-out',
        'fade-right': 'fadeRight 0.8s ease-out',
        'scale': 'scale 0.6s ease-out',
        'rotate': 'rotate 0.5s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(20px) rotate(-2deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scale: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        rotate: {
          from: { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(255, 105, 180, 0.3), 0 0 10px rgba(255, 105, 180, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 105, 180, 0.6), 0 0 40px rgba(255, 105, 180, 0.4)',
          },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'premium': '0 20px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
        'premium-lg': '0 30px 60px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)',
        'premium-xl': '0 40px 80px rgba(0, 0, 0, 0.2), 0 15px 30px rgba(0, 0, 0, 0.1)',
        'inner-premium': 'inset 0 2px 4px 0 rgba(255, 105, 180, 0.1)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}