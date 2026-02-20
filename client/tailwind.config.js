/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serifDisplay: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif']
      },
      backgroundImage: {
        vignette: 'radial-gradient(circle at top, rgba(120, 53, 15, 0.35), transparent 60%)'
      }
    }
  },
  plugins: []
};
