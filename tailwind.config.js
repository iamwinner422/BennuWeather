/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                swatch_1: '#3879e0',
                swatch_2: '#03030e',
                swatch_3: '#e4f5fd',
                swatch_4: '#2a60b8',
                swatch_5: '#aac2df',
                swatch_6: '#3c405c',
                swatch_7: '#986580',
                background: '#84BBF4',
                appBackground: '#10103b',
            }
        },
    },
    plugins: [require('tailwindcss-motion')],
}

