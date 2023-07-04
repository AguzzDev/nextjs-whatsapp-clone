const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      width: {
        fullW: "95vw",
      },
      height:{
        fullH: "93vh"
      },
      maxWidth: {
        fullW: "95vw",
      },
      maxHeight:{
        fullH: "93vh"
      },
      minWidth: {
        fullW: "95vw",
      },
      minHeight:{
        fullH: "93vh"
      }
    },
    fontFamily: {},
    backgroundImage: {
      backgroundChat: "url('/backgroundChat.png')",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
      black: colors.black,
      white: colors.white,
      border: "#2a3942",
      body: "#090E11",
      bodylight: "#D9DBD6",
      gray1: "#222E35",
      gray2: "#CFD1D2",
      gray3: "#2A2F32",
      gray4: "#B1B3B5",
      gray5: "#DDE3E7",
      gray6: "#323739",
      gray7: "#182229",
      grayfont: "#666666",
      grayfont2: "#F8F9FA",
      grayfont3: "#6C96A0",
      green1: "#087C71",
      greenChat: "#056162",
      black1: "#131C21",
      blue1: "#085373",
      blue2: "#2a3942",
      white1: "#F8F9FA",
      white2: "#9DE1FE",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
