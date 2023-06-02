/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#34d399',
        secondary: '#fafafa',
        bordercolor: '##cbd5e1',
        hovercolor: '#1f7e5b'
      }
    }
  },
  plugins: []
}
