/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A7 Agents Brand Colors - Exact values from Wix site
        'a7-primary': '#C45308', // rgb(196, 83, 8) - Main orange
        'a7-primary-light': '#EFA573', // rgb(239, 165, 115) - Lighter orange
        'a7-primary-dark': '#963F06', // rgb(150, 63, 6) - Darker orange
        'a7-primary-darker': '#4B2003', // rgb(75, 32, 3) - Darkest orange
        'a7-secondary': '#E15F09', // rgb(225, 95, 9) - Secondary orange
        'a7-accent': '#C45308', // Same as primary for consistency
        'a7-success': '#10b981', // Emerald
        'a7-warning': '#C45308', // Using primary orange
        'a7-text': {
          primary: '#000000',
          secondary: '#404040', // rgb(64, 64, 64)
          muted: '#808080', // rgb(128, 128, 128)
          light: '#BFBFBF', // rgb(191, 191, 191)
        },
        'a7-dark': {
          950: '#000000', // Pure black
          900: '#0a0a0a', // Near black
          800: '#141414', // Dark gray
          700: '#1f1f1f', // Slightly lighter
          600: '#2a2a2a', // Border gray
          500: '#404040', // rgb(64, 64, 64)
        },
      },
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
        'sans': ['Montserrat', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'h1': ['64px', { lineHeight: '1.4' }],
        'h2': ['40px', { lineHeight: '1.4' }],
        'h3': ['24px', { lineHeight: '1.4' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'h5': ['18px', { lineHeight: '1.4' }],
        'h6': ['14px', { lineHeight: '1.4' }],
        'body-lg': ['24px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.4' }],
        'body-sm': ['14px', { lineHeight: '1.4' }],
        'body-xs': ['12px', { lineHeight: '1.4' }],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(196, 83, 8, 0.5), 0 0 10px rgba(196, 83, 8, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(196, 83, 8, 0.8), 0 0 30px rgba(196, 83, 8, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      letterSpacing: {
        'extra-wide': '0.2em',
        'super-wide': '0.3em',
      },
      maxWidth: {
        'site': '980px', // Matches Wix site width
      },
    },
  },
  plugins: [],
}
