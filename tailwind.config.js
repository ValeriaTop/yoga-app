/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index-yoga.html', // Archivo HTML principal
    './assets/**/*.{js,ts,jsx,tsx,vue}', // Archivos Vue, JS, etc.
  ],
  theme: {
    extend: {}, // Aquí puedes personalizar el tema
  },
  plugins: [], // Agrega plugins si los necesitas
};
