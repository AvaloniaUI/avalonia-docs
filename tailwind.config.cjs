const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        // Open Sans (same as Customer Portal)
        sans: ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        jakarta: ['"Outfit"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
      },
      borderRadius: {
        // Customer Portal uses 0.5rem (lg) as default
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      screens: {
        sm: '0px',
        lg: '997px',
      },
      colors: {
        // Brand colors (Customer Portal)
        brand: {
          25: 'var(--color-brand-25)',
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
        },
        // Gray scale (Customer Portal)
        gray: {
          25: 'var(--color-gray-25)',
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        primary: {
          DEFAULT: 'var(--color-brand-500)',
          100: 'rgb(var(--docs-color-primary-100, 0 125 249) / <alpha-value>)',
          200: 'rgb(var(--docs-color-primary-200, 0 125 249) / <alpha-value>)',
        },
        secondary: {
          DEFAULT:
            'rgb(var(--docs-color-secondary-1000, 0 0 0) / <alpha-value>)',
          1000: 'rgb(var(--docs-color-secondary-1000, 0 0 0) / <alpha-value>)',
          900: 'rgb(var(--docs-color-secondary-900, 25 25 25) / <alpha-value>)',
          800: 'rgb(var(--docs-color-secondary-800, 38 38 38) / <alpha-value>)',
          700: 'rgb(var(--docs-color-secondary-700, 71 71 71) / <alpha-value>)',
        },
        text: {
          400: 'rgb(var(--docs-color-text-400, 153 153 153) / <alpha-value>)',
        },
        darkblue: '#1B2A4E',
        darkerblue: '#192440',
        darkestblue: '#171B2D',
      },
      boxShadow: {
        // Customer Portal shadow system
        'theme-xs': 'var(--shadow-theme-xs)',
        'theme-sm': 'var(--shadow-theme-sm)',
        'theme-md': 'var(--shadow-theme-md)',
        'theme-lg': 'var(--shadow-theme-lg)',
      },
    },
  },
  plugins: [],
};
