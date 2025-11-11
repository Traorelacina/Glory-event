import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        serif: 'Playfair Display:400,500,600,700',
        sans: 'Montserrat:300,400,500,600',
      },
    }),
  ],
  theme: {
    colors: {
      'rose-gold': '#D89A79',
      'rose-gold-light': '#F4CBB2',
      'text-primary': '#000000',
      'text-secondary': '#333333',
      'bg-light': '#FAFAFA',
      'bg-white': '#FFFFFF',
    },
    animation: {
      'fade-in-up': 'fadeInUp 0.8s ease-out',
      'loading': 'loading 1.5s infinite',
    },
    keyframes: {
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(30px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      loading: {
        '0%': { 'background-position': '200% 0' },
        '100%': { 'background-position': '-200% 0' },
      },
    },
  },
})