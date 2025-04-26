/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velora: {
          light: '#4F8DF9',  // soft blue
          dark: '#6F7CF9',   // soft purple tint
        }
      }
    },
  },
  plugins: [],
}

