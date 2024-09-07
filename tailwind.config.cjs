/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#A05AFF',
        secondary: '#1BCFB4',
        support1: '#4BCBEB',
        support2: '#FE9496',
        support3: '#9E58FF',
      },
    },
  },
  plugins: [
   // require("@material-tailwind/react"),
    //require("@tailwindcss/typography"),
  ],
});
