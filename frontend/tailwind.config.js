import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        crimson: {
          50:  'oklch(0.97 0.02 22)',
          100: 'oklch(0.93 0.05 22)',
          200: 'oklch(0.87 0.09 22)',
          300: 'oklch(0.78 0.13 22)',
          400: 'oklch(0.67 0.17 22)',
          500: 'oklch(0.57 0.20 22)',
          600: 'oklch(0.48 0.20 22)',
          700: 'oklch(0.40 0.18 22)',
          800: 'oklch(0.32 0.14 22)',
          900: 'oklch(0.24 0.10 22)',
        },
        indigo: {
          50:  'oklch(0.97 0.02 280)',
          100: 'oklch(0.93 0.05 280)',
          200: 'oklch(0.85 0.09 280)',
          300: 'oklch(0.74 0.13 280)',
          400: 'oklch(0.62 0.17 280)',
          500: 'oklch(0.52 0.20 280)',
          600: 'oklch(0.44 0.20 280)',
          700: 'oklch(0.37 0.17 280)',
          800: 'oklch(0.29 0.13 280)',
          900: 'oklch(0.22 0.09 280)',
        },
        slate: {
          50:  'oklch(0.98 0.004 240)',
          100: 'oklch(0.95 0.007 240)',
          200: 'oklch(0.90 0.010 240)',
          300: 'oklch(0.82 0.013 240)',
          400: 'oklch(0.68 0.015 240)',
          500: 'oklch(0.55 0.015 240)',
          600: 'oklch(0.44 0.013 240)',
          700: 'oklch(0.35 0.012 240)',
          800: 'oklch(0.26 0.010 240)',
          900: 'oklch(0.18 0.008 240)',
          950: 'oklch(0.12 0.006 240)',
        },
      },
      boxShadow: {
        editorial: '0 2px 8px oklch(0.15 0.02 240 / 0.08), 0 1px 3px oklch(0.15 0.02 240 / 0.06)',
        'editorial-lg': '0 8px 32px oklch(0.15 0.02 240 / 0.12), 0 4px 12px oklch(0.15 0.02 240 / 0.08)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter, system-ui, sans-serif',
            h1: { fontFamily: 'Playfair Display, Georgia, serif' },
            h2: { fontFamily: 'Playfair Display, Georgia, serif' },
            h3: { fontFamily: 'Playfair Display, Georgia, serif' },
            h4: { fontFamily: 'Playfair Display, Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [typography, animate],
};
