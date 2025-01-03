/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#6C42CE',
        'brand-teal': '#40C9B5',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(135deg, #6C42CE 0%, #40C9B5 100%)',
      }
    },
  },
  plugins: [],
}
