/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: {
          dark: "#1B262C",
        },
      },
    },
  },
  plugins: [],
};