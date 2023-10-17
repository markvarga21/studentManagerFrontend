const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        uniGreen: "#3F7467",
        lightUniGreen: "#44B89C",
        darkUniGreen: "#7DA198",
        uniGold: "#FFAB0D",
        uniGoldLight: "#FFC962",
      },
    },
  },
  plugins: [],
});
