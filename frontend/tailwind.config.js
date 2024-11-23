/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define custom font families
      fontFamily: {
        'avenir': ['Avenir', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      // Define custom font sizes
      fontSize: {
        'product-list-heading': '45px',
        'rating': '14px',
        'color-text': '12px',
        'price': '15px',
        'product-title': '15px',
      },
    },
  },
  plugins: [],
}
