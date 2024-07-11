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
        creme: "#E1B77A",
        darkCreme: "#BB812A",
        gray: "#D4D7D9",
        darkGray: "#48494A",
        tableGray: "#E8E8E8",
        tableTextColor: "#A2A2A3",
        darkPurple: "#80789E",
        lightPurple: "#C4C1E0",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
});
