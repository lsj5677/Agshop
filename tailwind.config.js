/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        beige: "#F0E5DE",
        brown: {
          light: "#9B8281",
          dark: "#534847",
        },
        green: "#5A9367",
      },
      fontFamily: {
        sans: ["Raleway", ...defaultTheme.fontFamily.sans],
        serif: ["Marcellus", ...defaultTheme.fontFamily.serif],
        cursive: ["Solitreo"],
      },
      backgroundImage: {
        banner: `url('../public/images/banner3.jpeg')`,
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
