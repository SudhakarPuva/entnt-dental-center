/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",      // Blue
        secondary: "#F8FAFC",    // Light Background
        mint: "#10B981",         // Accent
      },
    },
  },
  plugins: [],
};
