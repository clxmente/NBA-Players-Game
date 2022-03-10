const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.js",
    "./components/**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
