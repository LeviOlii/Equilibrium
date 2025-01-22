/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmSans: ['DM Sans', 'sans-serif'], // Adiciona DM Sans como uma opção
      },
      colors: {
        'mobile-bg': '#DCE9E2', // Adiciona a cor como uma variável no Tailwind
        'desktop-bg': '#00856F',
        'brand-green-hover': '#00453A',
        'gray-headline': '#061800',
        'brand-beige': '#FFFAF1'
      },
    },
  },
  plugins: [],
};
