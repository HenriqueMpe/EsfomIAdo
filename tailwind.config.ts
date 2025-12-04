import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                sage: {
                    50: '#f6f8f4',
                    100: '#e8ede3',
                    200: '#d1dbc7',
                    300: '#afc19e',
                    400: '#8ba876',
                    500: '#6b8e5a',
                    600: '#547145',
                    700: '#425938',
                    800: '#37492f',
                    900: '#2e3d28',
                },
                terracotta: {
                    50: '#fef6f3',
                    100: '#fdeae3',
                    200: '#fbd4c6',
                    300: '#f7b49a',
                    400: '#f28b6d',
                    500: '#e96947',
                    600: '#d54d2e',
                    700: '#b23d24',
                    800: '#933523',
                    900: '#792f21',
                },
                cream: {
                    50: '#fdfcfa',
                    100: '#faf7f2',
                    200: '#f5ede2',
                    300: '#ecdfc9',
                    400: '#e0caa8',
                    500: '#d4b58d',
                    600: '#c19e75',
                    700: '#a68360',
                    800: '#886a51',
                    900: '#6f5744',
                },
                charcoal: {
                    50: '#f7f7f6',
                    100: '#e4e4e2',
                    200: '#c9c9c5',
                    300: '#a8a8a2',
                    400: '#88887f',
                    500: '#6f6f66',
                    600: '#5a5a52',
                    700: '#4a4a44',
                    800: '#3f3f3a',
                    900: '#373733',
                },
            },
            fontFamily: {
                sans: ['Source Sans Pro', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [],
} satisfies Config;
