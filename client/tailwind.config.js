/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0C10',
        'surface-1': '#11141B',
        'surface-2': '#171B24',
        elevated: '#1C212C',
        'border-subtle': '#1F242D',
        'border-strong': '#2A3140',
        'border-focus': '#0070BA',
        'paypal-blue': '#0070BA',
        'paypal-hover': '#005EA6',
        settled: '#34D399',
        pending: '#FBBF24',
        delayed: '#FB923C',
        refunded: '#F87171',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
