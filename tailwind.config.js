/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'yc-orange': '#FF6600',
      },
      animation: {
        'highlight': 'highlight 3s ease-in-out infinite',
      },
      keyframes: {
        highlight: {
          '0%': { transform: 'translateX(-200%) rotate(30deg)' },
          '100%': { transform: 'translateX(200%) rotate(30deg)' },
        },
      },
      zIndex: {
        '1': '1',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    'bg-gradient-to-br',
    'from-white',
    'to-orange-50',
    'dark:from-gray-900',
    'dark:to-black',
    'scale-105',
    'z-1',
  ],
  plugins: [],
  corePlugins: {
    preflight: true,
    backgroundImage: true,
    gradientColorStops: true,
    spacing: true,
    width: true,
    height: true,
    padding: true,
    margin: true,
    display: true,
    flex: true,
    gap: true,
    position: true,
    inset: true,
    overflow: true,
    whitespace: true,
    borderRadius: true,
    opacity: true,
    cursor: true,
    pointerEvents: true,
    zIndex: true,
    scale: true,
    transform: true,
    animation: true,
    transitionProperty: true,
    transitionDuration: true,
    transitionTimingFunction: true,
  },
}