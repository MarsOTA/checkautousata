/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#07111F',
        deep: '#0A1B33',
        cyan: '#12CFF4',
        light: '#F6F8FB',
        ink: '#0C1A2B',
        muted: '#66788A',
        amber: '#FFB547'
      },
      boxShadow: {
        glow: '0 0 30px rgba(18,207,244,.22)'
      }
    }
  },
  plugins: []
};
