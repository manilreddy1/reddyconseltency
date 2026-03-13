import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './lib/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F59E0B',
        surface: '#F8FAFC',
        ink: '#0F172A'
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Poppins', 'sans-serif'],
        body: ['Inter', 'Open Sans', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245, 158, 11, 0.20), transparent), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(59, 130, 246, 0.15), transparent), linear-gradient(180deg, #050d1a 0%, #0c1629 50%, #0f172a 100%)'
      },
      boxShadow: {
        glass: '0 20px 60px rgba(15, 23, 42, 0.18)',
        glow: '0 0 60px rgba(245, 158, 11, 0.3)',
        'glow-blue': '0 0 80px rgba(59, 130, 246, 0.2)'
      }
    }
  },
  plugins: []
};

export default config;
