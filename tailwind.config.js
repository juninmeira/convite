/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cherry: {
          primary: '#e54a66',    // Cherry sólido
          vibrant: '#ff2f63',    // Cherry vibrante
          light: '#fdabbb',      // Rosa cereja claro
          bg: '#fdebf2',         // Fundo suave rosado
          leaf: '#75C043',       // Verde folha
          gold: '#ecbe09',       // Dourado elegante
        },
        // Mantendo compatibilidade com rose e pink do Tailwind
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.6s ease-out',
        'bounce': 'bounce 2s infinite',
        'confetti-explosion': 'confettiExplosion 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        confettiExplosion: {
          '0%': { 
            transform: 'translate(var(--start-x), var(--start-y)) scale(0) rotate(0deg)',
            opacity: '0',
          },
          '10%': {
            transform: 'translate(calc(var(--start-x) * 0.9 + var(--end-x) * 0.1), calc(var(--start-y) * 0.9 + var(--end-y) * 0.1)) scale(1.2) rotate(180deg)',
            opacity: '1',
          },
          '50%': {
            transform: 'translate(calc(var(--start-x) * 0.3 + var(--end-x) * 0.7), calc(var(--start-y) * 0.3 + var(--end-y) * 0.7)) scale(1) rotate(360deg)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translate(0, 0) scale(0.9) rotate(720deg)',
            opacity: '0.6',
          },
        },
      },
    },
  },
  plugins: [],
}

