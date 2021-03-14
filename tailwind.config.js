module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dapp-background': '#191919',
        'cta': '#FEC004',
        'light-text': '#E9EAE9',
        'logout-address': '#383838',
        'logout-icon': '#686868'
      },
      fontFamily: {
        'primary': 'Montserrat, sans-serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
