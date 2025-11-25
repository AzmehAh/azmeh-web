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
        // هذا سيُطبّق على العنصر الذي يحتوي على الكلاس
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#003399',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f3f4f6',
          },
          // دعم Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: '#003399 #f3f4f6',
        },
        // لضمان أن الصفحة قابلة للتمرير
        '.scrollable-page': {
          height: '100vh',
          overflowY: 'auto',
        },
      });
    },
  ],
};