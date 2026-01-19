/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        brand: "oklch(0.62 0.15 260 / <alpha-value>)",
      },
    },
  },
  darkMode: "class",
};
