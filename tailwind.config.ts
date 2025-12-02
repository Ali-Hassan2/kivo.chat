import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],

  theme: {
    extend: {
      colors: {},
      boxShadow: {
        kivo: '0px 2px 3px 0px #ff00001f',
        kivoSoft: '0 2px 6px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        kivo: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config
