/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        tablet: "601px",
        desktop: "1201px",
      },
      fontFamily: {
        serif: ['"Times New Roman"', "Times", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        header: "#e8edf2",
        hero: "#b8d4ea",
        promo: "#d4e4ef",
        "card-footer": "#e8edf2",
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        hero: "250px",
        promo: "50px",
        thumb: "80px",
      },
      gap: {
        grid: "20px",
      },
    },
  },
  plugins: [],
};
