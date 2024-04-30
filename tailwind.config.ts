import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                'xl': '1024px',
                '2xl': '1024px'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'ui-sans-serif', 'system-ui'],
            },
            keyframes: {
                'show-blur': {
                    '0%': { filter:'blur(5px)', opacity:'0' },
                    '100%': { filter:'blur(0px)', opacity:'1' },
                },
                'button-ripple': {
                    '0%': { filter:'blur(0px)', width: '0px', opacity: '0.15' },
                    '100%': { filter:'blur(30px)', width: '300%', opacity: '0' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': {  opacity: '0' },
                },
                'rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'progress': {
                    '0%': { strokeDashoffset: 'var(--offset)' },
                    '50%': { strokeDashoffset: '0' },
                    '100%': { strokeDashoffset: 'var(--unoffset)' },
                }
            },
            animation: {
                'show-blur': 'show-blur 0.7s linear forwards',
                'button-ripple': 'button-ripple 0.4s linear forwards',
                'fade-in': 'fade-in 0.3s forwards',
                'fade-out': 'fade-out 0.3s forwards',
                'rotate': 'rotate 1.4s linear infinite',
                'progress': 'progress 1.4s ease-in-out infinite'
            },
        },
    },
    plugins: [],
};
export default config;
