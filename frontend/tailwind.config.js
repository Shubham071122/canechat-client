/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        '1200': '1200ms', 
      },
      backgroundImage: (theme) => ({
        'lightBg':"url('/src/assets/chBg.jpg')",
        'darkBg':"url('/src/assets/chBgD.jpg')",
      }),
    },
  },variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
}