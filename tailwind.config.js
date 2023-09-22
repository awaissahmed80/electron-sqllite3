/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
// import colors from 'tailwindcss/colors'
// import typography from '@tailwindcss/typography'
// import tailwindforms from '@tailwindcss/forms'


module.exports = {
    darkMode: 'class',
    content: ['./src/renderer/src/*.{js,jsx}', './src/renderer/src/**/*.{js,jsx}'],
    theme: {        
        extend: {
            typography: (theme) => ({
                DEFAULT:{
                    css:{                        
                        color: theme('colors.slate.600'),
                        a:{
                            textDecoration: "none"
                        },
                        h2:{
                            color: theme('colors.slate.800')
                        }
                    }
                },                 
            }),                  
            colors:{
                primary: colors.sky,
                secondary: colors.orange,
                transparent: 'transparent',
            },
            
            
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms')        
    ],
}
