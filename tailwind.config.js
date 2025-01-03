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
        'gradient-custom': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}