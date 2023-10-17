const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        uniGreen: "#00AE82",
        lightUniGreen: "#A5EEDC",
        darkUniGreen: "#00916C",
        uniGold: "#FFAB0D",
        uniGoldLight: "#FFC962",
      },
    },
  },
  plugins: [],
});
