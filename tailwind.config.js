/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--poppins-next-font)"],
        sans: ["var(--poppins-next-font)"],
        mono: ["var(--roboto-mono-next-font)"],
      },
      colors: {
        "white": "#fff",
        "black": "#000",

        "primary": "#3F8DD6",
        "secondary": "#0D2879",
        "danger": "#D42A2A",

        "gray-100": "#F9F8FE",
        "gray-200": "#F2F0F8",
        "gray-300": "#EEEEEE",
        "gray-400": "#B2B4BE",
        "gray-600": "DEDEE3",
        "gray-500": "#6F7589",
        "gray-700": "#4C5061",
      },
    },
  },
  plugins: [],
  darkMode: "class"
}
