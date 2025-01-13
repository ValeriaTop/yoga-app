/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index-yoga.html', 
    './login-yoga.html', 
    './clases-yoga.html',
    './profile-yoga.html',
    './info-personal.html',
    './membresia-yoga.html',
    './pago-yoga.html',
    './soporte-yoga.html',
    './assets/**/*.{js,ts,jsx,tsx,vue}', // Archivos Vue, JS, etc.
  ],
  theme: {
    extend: {
      colors:{
        'verde-om': '#137172',
        'morado-om': '#4E1150',
        'naranja-om': '#99351E',
        'dorado-om': '#B39156',
        'negro-om': '#272726',
      },
    }, // Aquí puedes personalizar el tema
  },
  plugins: [], // Agrega plugins si los necesitas
};
