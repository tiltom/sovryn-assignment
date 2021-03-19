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
        'logout-icon': '#686868',
        'modal-border': '#575757',
        'button-group': '#2274A5',
        'button-group-hover': '#2274A580',
      },
      fontFamily: {
        'primary': 'Montserrat, sans-serif',
      },
      spacing: {
        '100': '25rem',
      },
      transitionProperty: {
        'height': 'height'
      }
    },
    minWidth: {
      '0': '0',
      '100': '25rem',
     }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
