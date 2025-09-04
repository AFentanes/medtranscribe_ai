/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core System Colors */
        background: 'var(--color-background)', // gray-50 with blue undertone
        foreground: 'var(--color-foreground)', // charcoal-900
        border: 'var(--color-border)', // gray-500 with opacity
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-600
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // charcoal-900
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // charcoal-900
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)' // gray-500
        },

        /* Brand Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-800 Hospital Angeles brand
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // blue-600 lighter variant
          foreground: 'var(--color-secondary-foreground)' // white
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-400 warm gold
          foreground: 'var(--color-accent-foreground)' // charcoal-900
        },

        /* Status Colors */
        success: {
          DEFAULT: 'var(--color-success)', // emerald-600 medical green
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-600
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600 clinical red
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)' // white
        },

        /* Medical Specific Colors */
        'medical-alert': 'var(--color-medical-alert)', // amber-400 for critical alerts
        'medical-success': 'var(--color-medical-success)', // emerald-600 for confirmations
        'medical-caution': 'var(--color-medical-caution)', // amber-600 for warnings
        'medical-critical': 'var(--color-medical-critical)', // red-600 for errors
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'], // headings font
        'body': ['Source Sans Pro', 'system-ui', 'sans-serif'], // body text font
        'caption': ['Roboto', 'system-ui', 'sans-serif'], // captions font
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'], // data/code font
      },
      fontSize: {
        'medical-xs': ['0.75rem', { lineHeight: '1rem' }],
        'medical-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'medical-base': ['1rem', { lineHeight: '1.5rem' }],
        'medical-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'medical-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'medical-2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      spacing: {
        'medical-xs': '0.25rem', // 4px
        'medical-sm': '0.5rem',  // 8px
        'medical-base': '1rem',  // 16px base unit
        'medical-lg': '1.5rem',  // 24px
        'medical-xl': '2rem',    // 32px
        'medical-2xl': '3rem',   // 48px
        'medical-3xl': '4rem',   // 64px navigation height
      },
      boxShadow: {
        'medical': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.08)',
        'medical-elevated': '0 4px 12px rgba(0,0,0,0.12)',
        'medical-focus': '0 0 0 2px var(--color-ring)',
      },
      borderRadius: {
        'medical': '0.375rem', // 6px
        'medical-lg': '0.5rem', // 8px
        'medical-xl': '0.75rem', // 12px
      },
      animation: {
        'medical-pulse': 'medical-pulse 1.5s infinite',
        'medical-fade-in': 'fadeIn 200ms ease-out',
        'medical-slide-down': 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'medical-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1.0' }
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slideDown': {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' }
        }
      },
      backdropBlur: {
        'medical': '8px',
      },
      zIndex: {
        'navigation': '1000',
        'dropdown': '1100',
        'modal': '1200',
        'security': '1300',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}