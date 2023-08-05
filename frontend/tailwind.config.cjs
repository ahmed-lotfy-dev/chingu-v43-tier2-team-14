/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "#f1eee3",
        "text-main": "#1c1f2c",
        "bg-alt": "#fdfbf7",
        "text-btn": "#999ba0",
        "bg-btn": "#272a34",
      },
      gridTemplateColumns: {
        // add responsive container for 5 cards
        200: "repeat(auto-fit, minmax(200px, 1fr))",
        250: "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
