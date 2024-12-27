/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index-yoga.html', 
    './login-yoga.html', 
    './clases-yoga.html',
    './profile-yoga.html',
    './info-personal.html',
    './membresia-yoga.html',
    './assets/**/*.{js,ts,jsx,tsx,vue}', // Archivos Vue, JS, etc.
  ],
  theme: {
    extend: {}, // Aquí puedes personalizar el tema
  },
  plugins: [], // Agrega plugins si los necesitas
};
