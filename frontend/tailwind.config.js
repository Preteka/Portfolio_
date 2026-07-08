/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        card: '#18181B',
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        accent: {
          DEFAULT: '#38BDF8',
          light: '#7DD3FC',
          dark: '#0284C7',
        },
        text: '#FFFFFF',
        muted: '#A1A1AA',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(124, 58, 237, 0.08) 1px, transparent 1px)",
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(124, 58, 237, 0.15)',
        'glow-accent': '0 0 20px rgba(56, 189, 248, 0.15)',
      },
    },
  },
  plugins: [],
}
