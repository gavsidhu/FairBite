/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Obviously-Narrow', 'sans-serif'],
        normal: ["Rubik", 'sans-serif']
      },
    },
  },
  plugins: [],
}

