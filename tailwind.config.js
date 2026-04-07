/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo
          hover: '#4338CA',
          light: '#EEF2FF',
          dark: '#312E81',
        },
        secondary: {
          DEFAULT: '#6366F1', // Soft Indigo
        },
        accent: {
          DEFAULT: '#22C55E', // Green
          hover: '#16A34A',
          light: '#DCFCE7',
          dark: '#14532D',
        },
        background: '#F8FAFC',
        card: '#FFFFFF',
        border: '#E2E8F0',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'float': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 15px rgba(79, 70, 229, 0.3)',
      }
    },
  },
  plugins: [],
}
