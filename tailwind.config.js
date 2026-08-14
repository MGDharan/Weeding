/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF6F0',
          200: '#F5EFE6',
          300: '#E8DFD8',
          400: '#D0C3B5',
        },
        gold: {
          light: '#FAF0CA',
          DEFAULT: '#D4AF37',
          medium: '#C5A059',
          dark: '#B38F38',
          accent: '#E5C158',
        },
        maroon: {
          light: '#800020',
          DEFAULT: '#6B1D2F',
          dark: '#4A121A',
          deep: '#340911',
        },
        luxury: {
          brown: '#2C1D18',
          dark: '#1A100E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'ken-burns': 'kenburns 25s ease-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-up-blur': 'slideUpBlur 0.7s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'tilt-in': 'tiltIn 0.8s ease-out forwards',
        'flip-card': 'flipCard 0.6s ease-in-out',
        'border-dance': 'borderDance 12s linear infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 30s linear infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-1%, -1%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUpBlur: {
          '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(212,175,55,0.5), inset 0 0 40px rgba(212,175,55,0.1)' },
        },
        tiltIn: {
          '0%': { opacity: '0', transform: 'perspective(800px) rotateY(15deg)' },
          '100%': { opacity: '1', transform: 'perspective(800px) rotateY(0deg)' },
        },
        flipCard: {
          '0%': { transform: 'perspective(600px) rotateX(0deg)' },
          '50%': { transform: 'perspective(600px) rotateX(90deg)' },
          '100%': { transform: 'perspective(600px) rotateX(0deg)' },
        },
        borderDance: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.9' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FAF0CA 0%, #D4AF37 50%, #C5A059 100%)',
        'gold-shimmer': 'linear-gradient(90deg, rgba(212,175,55,0.2) 0%, rgba(255,245,200,0.6) 50%, rgba(212,175,55,0.2) 100%)',
        'maroon-gradient': 'linear-gradient(180deg, rgba(107,29,47,0.9) 0%, rgba(52,9,17,0.95) 100%)',
      },
      perspective: {
        '800': '800px',
        '1000': '1000px',
        '1200': '1200px',
      },
    },
  },
  plugins: [],
}