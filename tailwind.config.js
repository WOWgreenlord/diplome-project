/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: {
          background: "#00003F",
          primary: {
            100: "#b6c5fc",
            200: "#a3b7fb",
            300: "#8ea9fa",
            400: "#779cf9",
            500: "#5d8ff8",
            600: "#3b82f6",
          },
          surface: {
            100: "#8b8b8b",
            200: "#717171",
            300: "#575757",
            400: "#3f3f3f",
            500: "#282828",
            600: "#121212",
          },
        },
      },
    },
  },
  plugins: [],
};
