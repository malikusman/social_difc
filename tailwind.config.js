/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        difc: {
          // Official DIFC brand palette
          blue: '#01516C',        // Regal Blue (primary)
          'blue-dark': '#023442',
          'blue-deep': '#012A37',
          'blue-light': '#0A6E8F',
          'blue-soft': '#E6EEF1',
          gold: '#B8924A',        // accent
          'gold-light': '#D8B978',
          grey: '#434343',        // Tundora
          'grey-light': '#8A8F94',
          sand: '#F5F5F5',        // Wild Sand
          'sand-dark': '#ECECEC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(1, 81, 108, 0.06), 0 4px 16px rgba(1, 81, 108, 0.06)',
        'card-hover': '0 4px 12px rgba(1, 81, 108, 0.10), 0 12px 32px rgba(1, 81, 108, 0.10)',
        panel: '0 1px 2px rgba(2, 52, 66, 0.08)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0, transform: 'translateY(6px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'fade-in-fast': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-up': { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.9)', opacity: 0.7 }, '100%': { transform: 'scale(1.6)', opacity: 0 } },
        'blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.25 } },
        'grow-bar': { '0%': { width: '0%' } },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-fast': 'fade-in-fast 0.25s ease-out both',
        'slide-up': 'slide-up 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-ring': 'pulse-ring 1.4s ease-out infinite',
        'blink': 'blink 1s steps(2) infinite',
      },
    },
  },
  plugins: [],
}
