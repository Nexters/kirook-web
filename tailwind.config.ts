import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/shared/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', ...fontFamily.sans],
      },
      fontSize: {
        // TODO: line height 배율 확정되면 추가
        header1: [
          '1.25rem',
          {
            fontWeight: '700',
          },
        ],
        title1: [
          '1.125rem',
          {
            fontWeight: '600',
          },
        ],
        title2: [
          '1rem',
          {
            fontWeight: '600',
          },
        ],
        title3: [
          '1rem',
          {
            fontWeight: '500',
          },
        ],
        body1: [
          '0.875rem',
          {
            fontWeight: '600',
          },
        ],
        body2: [
          '0.875rem',
          {
            fontWeight: '400',
          },
        ],
        text: [
          '0.75rem',
          {
            fontWeight: '400',
          },
        ],
        button: [
          '0.625rem',
          {
            fontWeight: '500',
          },
        ],
      },
      boxShadow: {
        'input-focus': 'inset 0 -2px 0 #FD0000',
      },
      colors: {
        grayscale: {
          50: '#F7F7FA',
          100: '#F0F0F5',
          150: '#F2F4F6',
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
