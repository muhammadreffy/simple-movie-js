/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        primary: "#6366F1",
        dark_custom: "#101828",
        primary_hover: "#363791",
      },
    },
  },
  plugins: [],
};
