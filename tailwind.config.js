/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      orange: '#F6AC57',
      orangeLight: '#FFCD94',
      brown: '#2E1901',
      brownLight: '#7C4200'
    },
    extend: {
      fontFamily: {
        'creepster': ['Creepster', 'cursive'],
        'alice': ['Alice', 'serif'],
      }
    },
  },
  plugins: [],
}

