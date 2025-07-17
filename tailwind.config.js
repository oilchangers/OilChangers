/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'avenir': ['Avenir Next', 'sans-serif'],
        'avenir-condensed': ['Avenir Next Condensed', 'sans-serif'],
        'text': ['var(--font-text)'],
        'headline': ['var(--font-headline)'],
      },
    },
  },
  plugins: [],
}

