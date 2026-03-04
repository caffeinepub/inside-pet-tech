/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
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
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        crimson: {
          50:  'oklch(0.97 0.02 22)',
          100: 'oklch(0.93 0.05 22)',
          200: 'oklch(0.86 0.09 22)',
          300: 'oklch(0.76 0.13 22)',
          400: 'oklch(0.64 0.16 22)',
          500: 'oklch(0.52 0.18 22)',
          600: 'oklch(0.42 0.18 22)',
          700: 'oklch(0.35 0.17 22)',
          800: 'oklch(0.28 0.14 22)',
          900: 'oklch(0.20 0.10 22)',
        },
        indigo: {
          50:  'oklch(0.97 0.02 265)',
          100: 'oklch(0.93 0.05 265)',
          200: 'oklch(0.86 0.08 265)',
          300: 'oklch(0.76 0.11 265)',
          400: 'oklch(0.64 0.13 265)',
          500: 'oklch(0.52 0.14 265)',
          600: 'oklch(0.44 0.14 265)',
          700: 'oklch(0.38 0.14 265)',
          800: 'oklch(0.28 0.12 265)',
          900: 'oklch(0.20 0.08 265)',
        },
        slate: {
          50:  'oklch(0.97 0.005 260)',
          100: 'oklch(0.94 0.008 260)',
          200: 'oklch(0.88 0.01 260)',
          300: 'oklch(0.78 0.015 260)',
          400: 'oklch(0.65 0.02 260)',
          500: 'oklch(0.52 0.025 260)',
          600: 'oklch(0.42 0.025 260)',
          700: 'oklch(0.32 0.025 260)',
          800: 'oklch(0.22 0.025 260)',
          850: 'oklch(0.18 0.025 260)',
          900: 'oklch(0.14 0.02 260)',
          950: 'oklch(0.10 0.015 260)',
        },
      },
      boxShadow: {
        'editorial': '0 2px 8px oklch(0.15 0.02 260 / 0.08), 0 1px 2px oklch(0.15 0.02 260 / 0.06)',
        'editorial-md': '0 4px 16px oklch(0.15 0.02 260 / 0.10), 0 2px 4px oklch(0.15 0.02 260 / 0.08)',
        'editorial-lg': '0 8px 32px oklch(0.15 0.02 260 / 0.12), 0 4px 8px oklch(0.15 0.02 260 / 0.08)',
        'crimson-glow': '0 4px 20px oklch(0.42 0.18 22 / 0.25)',
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
            color: 'oklch(0.20 0.02 260)',
            h1: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '700' },
            h2: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '700' },
            h3: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '600' },
            h4: { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '600' },
            a: { color: 'oklch(0.42 0.18 22)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            strong: { color: 'oklch(0.20 0.02 260)' },
            blockquote: {
              borderLeftColor: 'oklch(0.42 0.18 22)',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
