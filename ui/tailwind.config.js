/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#983628",
        "custom-red-hover": "#83251f",
        "custom-blue": "#1C324A",
        "custom-blue-hover": "#274668",
      },
    },
  },
  plugins: [],
};
