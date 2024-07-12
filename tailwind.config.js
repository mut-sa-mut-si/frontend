/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-color':'#FFBE98',
      },
      margin: {
        'custom-left': '267px',
      },
    },
  },
  plugins: [],
}

