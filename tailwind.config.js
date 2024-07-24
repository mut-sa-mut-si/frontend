/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-color': '#0E7B46',
                'customGreen': '#0E7B46',
        'customGray': '#A9A9A9',
            },
            margin: {
                'custom-left': '267px',
            },
        },
    },
    plugins: [],
};
