/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          500: "#F15156",
          600: "#E44449",
        },
        "butter-yellow": {
          400: "#F4D35E",
          500: "#dbbd54",
        },
        "midnight-blue": {
          800: "#0D3B66",
        },
        "baby-pink": {
          100: "#FDECED",
          200: "#FBE1E2",
          300: "#e1cacb",
        },
      },
      boxShadow: {
        focus: "0 0 0 1px #fff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
