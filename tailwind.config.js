const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        uniGreen: "#00AE82",
        lightUniGreen: "#C4EFE4",
        uniGold: "#FFAB0D",
        uniGoldLight: "#FFC962",
      },
    },
  },
  plugins: [],
});
