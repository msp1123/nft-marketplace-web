/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        "cinzel": "Audiowide, 'cursive'",
      },
      screens: {
        '3xl': '2040px',
      },
      animation: {
        shine: "shine 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addVariant }) {
      addVariant('m-only', "@media screen and (max-width: theme('screens.sm'))"); // instead of hard-coded 640px use sm breakpoint value from config. Or anything
    }),
  ],
}
