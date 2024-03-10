/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#983628",
        "custom-red-hover": "#83251f",
        "custom-red-alert-bg": "#EEC5BE",
        "custom-red-alert-text": "#CE4F3B",
        "custom-blue": "#1C324A",
        "custom-blue-hover": "#274668",
      },
      backgroundImage: {
        "not-found": "url(../src/images/not-found-bg.jpg)",
      },
    },
  },
  plugins: [],
};
