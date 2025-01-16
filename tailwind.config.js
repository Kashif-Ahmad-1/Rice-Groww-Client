module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkRed: '#800000',            // Base Dark Red Color
        'darkRed-600': '#990000',      // A custom shade of dark red (lighter)
        'darkRed-800': '#6a0000',      // A custom shade of dark red (darker)
        yellowCustom: '#FFD700',      // Custom yellow shade for hover effects (optional)
      },
    },
  },
  plugins: [],
}
