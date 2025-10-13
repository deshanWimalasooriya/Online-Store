/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50: '#e6f7ff',
          100: '#c2ecff',
          200: '#9ce0ff',
          300: '#6fd2ff',
          400: '#40bfff',
          500: '#1aa7ff',
          600: '#0b86e6',
          700: '#0b6bb8',
          800: '#0c4f85',
          900: '#0b375e',
        },
        fire: {
          50: '#fff1e6',
          100: '#ffd7b8',
          200: '#ffb77a',
          300: '#ff8f3d',
          400: '#ff6a14',
          500: '#ff3b00',
          600: '#e02600',
          700: '#b51a02',
          800: '#851405',
          900: '#5a0d04',
        },
        metal: '#cfd8e3',
        charcoal: '#0b0f1a',
      },
      fontFamily: {
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glowIce: '0 0 25px rgba(64,191,255,0.35)',
        glowFire: '0 0 25px rgba(255,106,20,0.35)',
      }
    },
  },
  plugins: [],
}
