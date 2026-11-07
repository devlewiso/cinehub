/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        negro: '#07070A',
        panel: '#121218',
        panel2: '#1A1A22',
        linea: '#2A2A35',
        texto: '#E7E7EE',
        suave: '#9A9AAD',
        rojo: { DEFAULT: '#E50914', claro: '#FF3B47' },
        oro: '#F5C518',
        verde: '#3DDC97',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
