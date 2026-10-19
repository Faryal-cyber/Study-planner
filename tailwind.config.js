/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0F0F10',
        darkCard: '#1A1A1E',
        darkBorder: '#2A2A30',
        brandOrange: '#FF6B00',
        brandGreen: '#10B981',
      }
    },
  },
  plugins: [],
}