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
        brand: {
          green: {
            deep: '#061D12',     // Very dark forest green (dark mode bg)
            card: '#0D2A1C',     // Dark green for cards (dark mode surfaces)
            light: '#1A4230',    // Lighter forest green for subtle highlights
            moss: '#2D5A42',     // Traditional temple green (light mode highlights)
            emerald: '#052A1A',  // Emerald tint
          },
          saffron: {
            DEFAULT: '#D95A1E',  // Rich warm South Indian saffron orange
            light: '#FF7F4D',    // Vibrant saffron glow
            dark: '#B04110',     // Deep rustic saffron
          },
          gold: {
            DEFAULT: '#CFA851',  // Traditional temple gold
            dark: '#A68235',     // Antique gold
            light: '#E5C682',    // Glowing gold
          },
          cream: {
            DEFAULT: '#FDFBF7',  // Soft luxurious linen-like white (light mode bg)
            surface: '#F5EFE6',  // Slightly darker cream for cards
            dark: '#EAE3D2',     // Warm sand/cream accent
            ivory: '#F7F4EB',    // Ivory tint (dark mode text)
          },
          charcoal: {
            DEFAULT: '#1C2821',  // Deep charcoal/moss green mix for light mode text
            muted: '#4A5B51',    // Muted green-gray for captions
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        cursive: ['"Playfair Display"', 'Georgia', 'serif'], // Fallback or Playfair Display Italic
      },
      backgroundImage: {
        'wooden-texture': "url('https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1920')", // Warm light wood grain
        'wood-dark': "url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1920')", // Premium dark mahogany
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      boxShadow: {
        'gold-soft': '0 4px 20px -2px rgba(207, 168, 81, 0.15)',
        'saffron-glow': '0 4px 25px -5px rgba(217, 90, 30, 0.4)',
        'glass-light': '0 8px 32px 0 rgba(12, 62, 38, 0.05)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
