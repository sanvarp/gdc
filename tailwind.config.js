/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2596be',
          50: '#e8f5f9',
          100: '#c5e7f2',
          200: '#9fd9eb',
          300: '#79cbe4',
          400: '#5dbddd',
          500: '#2596be',
          600: '#1e7ea1',
          700: '#176784',
          800: '#104f67',
          900: '#09374a',
        },
        secondary: {
          DEFAULT: '#61a4a8',
          50: '#eff7f7',
          100: '#d9ebec',
          200: '#c2dfe1',
          300: '#acd3d6',
          400: '#96c7cb',
          500: '#61a4a8',
          600: '#4e8387',
          700: '#3b6266',
          800: '#284145',
          900: '#152124',
        },
        accent: {
          DEFAULT: '#90a73f',
          50: '#f5f8e9',
          100: '#e7edc9',
          200: '#d9e2a9',
          300: '#cbd789',
          400: '#bdcc69',
          500: '#90a73f',
          600: '#738632',
          700: '#566525',
          800: '#394418',
          900: '#1c220b',
        },
        // Semantic tokens for UI states
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#e9ecef',
        },
        border: {
          DEFAULT: '#dee2e6',
          light: '#e9ecef',
          dark: '#adb5bd',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        128: '32rem',
      },
      animation: {
        // Entrance animations - Enhanced
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-scale': 'fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce-in': 'bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-up': 'slideInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'zoom-in': 'zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'flip-in': 'flipIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'rotate-in': 'rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',

        // Continuous animations - Enhanced
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 1s infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'shimmer-fast': 'shimmer 1.5s linear infinite',
        'gradient': 'gradient 10s ease infinite',
        'gradient-fast': 'gradient 6s ease infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-reverse': 'spinReverse 4s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'particle': 'particle 3s ease-in-out infinite',

        // Interactive animations - Enhanced
        'wiggle': 'wiggle 0.6s cubic-bezier(0.36, 0, 0.66, -0.56)',
        'shake': 'shake 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'bounce-subtle': 'bounceSubtle 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-up': 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-down': 'scaleDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'tilt': 'tilt 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'swing': 'swing 1s ease-in-out',
        'rubber-band': 'rubberBand 0.8s ease-in-out',

        // Stagger delays for lists - Enhanced
        'stagger-1': 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both',
        'stagger-2': 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
        'stagger-3': 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'stagger-4': 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        'stagger-5': 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both',
        'stagger-6': 'fadeInScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',

        // Special effects
        'ripple': 'ripple 0.8s cubic-bezier(0, 0, 0.2, 1)',
        'spotlight': 'spotlight 3s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'background-pan': 'backgroundPan 3s ease infinite',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Enhanced entrance keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(-5deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0)' },
        },
        flipIn: {
          '0%': { opacity: '0', transform: 'perspective(400px) rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'perspective(400px) rotateX(0)' },
        },
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-180deg) scale(0.5)' },
          '100%': { opacity: '1', transform: 'rotate(0) scale(1)' },
        },

        // Enhanced continuous keyframes
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(37, 150, 190, 0.5), 0 0 40px rgba(37, 150, 190, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(37, 150, 190, 0.8), 0 0 80px rgba(37, 150, 190, 0.6)'
          },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(37, 150, 190, 0.4), 0 0 30px rgba(37, 150, 190, 0.2), inset 0 0 10px rgba(37, 150, 190, 0.1)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(37, 150, 190, 0.8), 0 0 60px rgba(37, 150, 190, 0.5), inset 0 0 20px rgba(37, 150, 190, 0.3)'
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(8deg) scale(1.05)' },
          '75%': { transform: 'rotate(-8deg) scale(1.05)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        particle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1) drop-shadow(0 0 10px rgba(37, 150, 190, 0.5))'
          },
          '50%': {
            opacity: '0.85',
            filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(37, 150, 190, 0.8))'
          },
        },

        // Enhanced interactive keyframes
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)' },
        },
        tilt: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        swing: {
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        rubberBand: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scaleX(1.25) scaleY(0.75)' },
          '40%': { transform: 'scaleX(0.75) scaleY(1.25)' },
          '50%': { transform: 'scaleX(1.15) scaleY(0.85)' },
          '65%': { transform: 'scaleX(0.95) scaleY(1.05)' },
          '75%': { transform: 'scaleX(1.05) scaleY(0.95)' },
          '100%': { transform: 'scale(1)' },
        },

        // Special effects keyframes
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.7' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        spotlight: {
          '0%, 100%': {
            background: 'radial-gradient(circle at 50% 50%, rgba(37, 150, 190, 0.1) 0%, transparent 50%)'
          },
          '50%': {
            background: 'radial-gradient(circle at 50% 50%, rgba(37, 150, 190, 0.3) 0%, transparent 50%)'
          },
        },
        textShimmer: {
          '0%': {
            backgroundPosition: '-500%'
          },
          '100%': {
            backgroundPosition: '500%'
          },
        },
        borderGlow: {
          '0%, 100%': {
            borderColor: 'rgba(37, 150, 190, 0.3)',
            boxShadow: '0 0 5px rgba(37, 150, 190, 0.2)'
          },
          '50%': {
            borderColor: 'rgba(37, 150, 190, 0.8)',
            boxShadow: '0 0 20px rgba(37, 150, 190, 0.6)'
          },
        },
        backgroundPan: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        reveal: {
          '0%': {
            opacity: '0',
            clipPath: 'inset(0 100% 0 0)'
          },
          '100%': {
            opacity: '1',
            clipPath: 'inset(0 0 0 0)'
          },
        },
      },
      boxShadow: {
        // Focus states
        'focus-ring': '0 0 0 3px rgba(37, 150, 190, 0.3)',
        'focus-ring-accent': '0 0 0 3px rgba(144, 167, 63, 0.3)',

        // Glow effects
        'glow-xs': '0 0 5px rgba(37, 150, 190, 0.4), 0 0 10px rgba(37, 150, 190, 0.2)',
        'glow-sm': '0 0 10px rgba(37, 150, 190, 0.5), 0 0 20px rgba(37, 150, 190, 0.3)',
        'glow-md': '0 0 20px rgba(37, 150, 190, 0.6), 0 0 40px rgba(37, 150, 190, 0.4)',
        'glow-lg': '0 0 30px rgba(37, 150, 190, 0.7), 0 0 60px rgba(37, 150, 190, 0.5)',
        'glow-xl': '0 0 40px rgba(37, 150, 190, 0.8), 0 0 80px rgba(37, 150, 190, 0.6)',
        'glow-accent': '0 0 20px rgba(144, 167, 63, 0.6), 0 0 40px rgba(144, 167, 63, 0.4)',
        'glow-accent-lg': '0 0 30px rgba(144, 167, 63, 0.7), 0 0 60px rgba(144, 167, 63, 0.5)',

        // 3D effects
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'elevated-lg': '0 30px 40px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.06)',
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(37, 150, 190, 0.1)',
        'depth-sm': '0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.05)',
        'depth-md': '0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.08)',
        'depth-lg': '0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.1)',

        // Inner effects
        'inner-glow': 'inset 0 0 20px rgba(37, 150, 190, 0.2)',
        'inner-glow-lg': 'inset 0 0 30px rgba(37, 150, 190, 0.3)',
        'inner-shadow': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',

        // Neumorphism
        'neu-flat': '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.8)',
        'neu-pressed': 'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px rgba(255, 255, 255, 0.8)',

        // Colored shadows
        'primary': '0 10px 25px -5px rgba(37, 150, 190, 0.3), 0 5px 10px -5px rgba(37, 150, 190, 0.2)',
        'secondary': '0 10px 25px -5px rgba(97, 164, 168, 0.3), 0 5px 10px -5px rgba(97, 164, 168, 0.2)',
        'accent': '0 10px 25px -5px rgba(144, 167, 63, 0.3), 0 5px 10px -5px rgba(144, 167, 63, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snappy': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
