/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFF0F0',
          dark: '#1B1B1B',
        },
        backdrop: {
          primary: {
            DEFAULT: '#E3E3E3',
            dark: '#232323',
          },
          secondary: {
            DEFAULT: '#EDEDED',
            dark: '#2B2B2B',
          },
        },
        highlight: {
          DEFAULT: '#EF1A2D',
          light: '#F7898F',
          dark: '#790E1C',
        },
      },
    },
  },
  plugins: [],
};
