const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {

    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
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
      'body': '#090E11',
      'gray1': '#262D31',
      'gray2': "#CFD1D2",
      'gray3': '#2A2F32',
      'gray4': '#B1B3B5',
      'gray5': '#DDE3E7',
      'gray6': '#323739',
      'green1': '#087C71',
      'black1': '#131C21',
      'blue1': '#085373',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
