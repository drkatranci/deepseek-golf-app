// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
    './app/**/*.{html,js,ts,jsx,tsx}',
  ],
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-arrows': {
          '-webkit-appearance': 'none',
          '-moz-appearance': 'textfield',
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      colors: {
        'white': '#ffffff',
'rose': {
        '50': '#fef2f2',
        '100': '#fee2e2',
        '200': '#fdcbcb',
        '300': '#fba6a6',
        '400': '#f67373',
        '500': '#ed4646',
        '600': '#da2828',
        '700': '#b71e1e',
        '800': '#971d1d',
        '900': '#7e1e1e',
        '950': '#390909',
    },
    
        // Add any additional custom colors here
      },
    },
    // Remove the 'colors' key from here to prevent overriding defaults
    // If you need to customize other theme properties, keep them outside 'extend'
  },
}