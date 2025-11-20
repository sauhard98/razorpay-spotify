import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'spotify-green': '#1DB954',
        'spotify-green-hover': '#1ED760',
        'spotify-green-press': '#169C46',

        // Background Colors
        black: '#000000',
        'spotify-black': '#000000',
        base: '#121212',
        'elevated-base': '#1A1A1A',
        highlight: '#2A2A2A',
        'highlight-elevated': '#2A2A2A',
        tinted: '#181818',
        press: '#000000',

        // Text Colors
        white: '#FFFFFF',
        subdued: '#B3B3B3',
        subtle: '#6A6A6A',
        disabled: '#535353',

        // Accent Colors
        accent: {
          blue: '#0D72EA',
          red: '#E22134',
          orange: '#FF7300',
          yellow: '#FFC700',
          purple: '#8E44AD',
        },

        // Functional Colors
        essential: {
          positive: '#1DB954',
          negative: '#E22134',
          warning: '#FF7300',
          announcement: '#0D72EA',
        },

        // Overlay Colors
        overlay: 'rgba(0, 0, 0, 0.7)',
        'overlay-light': 'rgba(0, 0, 0, 0.4)',
        'overlay-heavy': 'rgba(0, 0, 0, 0.9)',
      },
      fontFamily: {
        sans: [
          'Circular Sp',
          'Circular',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        // Display
        'display-xl': ['96px', { lineHeight: '1', fontWeight: '700' }],
        'display-lg': ['72px', { lineHeight: '1', fontWeight: '700' }],
        'display-md': ['60px', { lineHeight: '1', fontWeight: '700' }],
        'display-sm': ['48px', { lineHeight: '1', fontWeight: '700' }],

        // Headings
        h1: ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        h5: ['18px', { lineHeight: '1.4', fontWeight: '700' }],
        h6: ['16px', { lineHeight: '1.5', fontWeight: '700' }],

        // Body
        'body-xl': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '1.4', fontWeight: '400' }],

        // Labels
        'label-lg': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'label-md': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'label-sm': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
        'label-xs': ['11px', { lineHeight: '1.3', fontWeight: '500' }],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '3.5': '28px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
        '20': '160px',
        '24': '192px',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.2)',
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.5)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.6)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        spin: 'spin 1s linear infinite',
      },
      zIndex: {
        modal: '1000',
        'modal-backdrop': '999',
        tooltip: '1001',
        dropdown: '100',
        sticky: '50',
      },
    },
  },
  plugins: [],
}
export default config
