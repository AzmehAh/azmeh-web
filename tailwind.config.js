/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        logo: '#003399',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        // دعم المتصفحات الحديثة (مثل Firefox)
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#003399 #f3f4f6',
        },
        // دعم WebKit (مثل Chrome, Safari)
        '.scrollbar-thumb-logo': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#003399',
            borderRadius: '8px',
          },
        },
        '.scrollbar-track-gray-100': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f3f4f6',
          },
        },
        '.scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
        },
      });
    },
  ],
};