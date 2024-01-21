import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/shared/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', ...fontFamily.sans],
      },
      colors: {
        grayscale: {
          50: '#F7F7FA',
          100: '#F0F0F5',
          200: '#E8E8EE',
          300: '#E1E1E8',
          400: '#CDCED6',
          500: '#A9ABB8',
          600: '#858899',
          700: '#525463',
          800: '#3E404C',
          900: '#2B2D36',
          950: '#19191B',
        },
      },
    },
    plugins: [],
  },
};

export default config;
