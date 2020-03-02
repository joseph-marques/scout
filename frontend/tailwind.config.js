const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        logo: ['Fredoka One', 'sans-serif'],
        serif: ['Crimson Text', ...defaultTheme.fontFamily.serif],
        sans: ['Work Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#FF8789',
        secondary: '#f2c3a5',
        accentLight: '#ea3f27',
        accentDark: '#5b3633',
        black: '#2A2A2A',
        darkgray: '#2A2A2A'
      }
    }
  },
  variants: {},
  plugins: []
};
