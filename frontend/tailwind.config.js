/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  extend: {
    theme: {
      colors: {
        gold: "#f2dfa5",
        blue: "#526ACD",
        black: "#000000",
        white: "#FFFFFF",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        graay: "#464646",
        "gray-light": "#d3dce6",
        salmon: "salmon",
        dark: "rgb(15, 15, 15)",
        red: "#ff0000",
      },
      fontFamily: {
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
