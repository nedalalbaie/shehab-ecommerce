import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#835400',
          200: '#EBE1D9',
          300: '#FFDDB5',
          400: 'rgb(122 78 0)', // Brown on hover
        },
        secondary: {
          100: "#004C6B",
          200: "rgb(0 67 94)" // Blue on hover
        },
        dark: '#303030',
        'nav-bg': '#F5F5F5'
      },
      width: {
        logo: 'clamp(8rem, -1.7895rem + 50.5263vw, 14rem);'
      },
      backgroundImage: {
        product: "url('./src/assets/images/river.jpg')"
      },
      gridTemplateColumns: {
        productsCards: "repeat(auto-fill, minmax(330px, 1fr))"
      },
      boxShadow: {
        'full-white': '0 0 15px -8px grey',
        'full-dark': '0 0 15px -8px black',
      },
    }
  },
  plugins: [],
} satisfies Config
