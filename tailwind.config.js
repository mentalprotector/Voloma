/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        wood: '#4A3728',
        slate: '#1A1A1A',
        cream: '#F4F1EB',
      },
    },
  },
  plugins: [],
}
