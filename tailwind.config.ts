import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/shared/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)', ...fontFamily.sans],
        changwonDangamAsac: ['var(--font-changwon-dangam-asac)', ...fontFamily.sans],
      },
      fontSize: {
        logo: [
          '24px',
          {
            fontWeight: '700',
            lineHeight: '28.8px',
          },
        ],
        header1: [
          '20px',
          {
            fontWeight: '700',
            lineHeight: '23.87px',
          },
        ],
        title1: [
          '18px',
          {
            fontWeight: '600',
            lineHeight: '24px',
          },
        ],
        title2: [
          '16px',
          {
            fontWeight: '600',
            lineHeight: '22px',
          },
        ],
        title3: [
          '16px',
          {
            fontWeight: '500',
            lineHeight: '22px',
          },
        ],
        body1: [
          '14px',
          {
            fontWeight: '600',
            lineHeight: '20px',
          },
        ],
        body2: [
          '14px',
          {
            fontWeight: '400',
            lineHeight: '20px',
          },
        ],
        text: [
          '12px',
          {
            fontWeight: '400',
            lineHeight: '16px',
          },
        ],
        button: [
          '10px',
          {
            fontWeight: '500',
            lineHeight: '13px',
          },
        ],
      },
      boxShadow: {
        'input-focus': 'inset 0 -2px 0 #5ED236',
      },
      colors: {
        'tag-gray': '#E5E5EF',
        'tag-red': '#FFE0E0',
        'tag-yellow': '#FFF0D4',
        'tag-green': '#D4F1E0',
        'tag-blue': '#E1EDFF',
        'tag-pink': '#FFE4F9',
        'tag-purple': '#EBDFFF',
        accent: {
          500: '#5ED236',
        },
        grayscale: {
          0: '#E5E5EF',
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
  safelist: [
    {
      pattern: /bg-(tag-gray|tag-red|tag-blue|tag-yellow|tag-green|tag-pink|tag-purple|black|white)/,
    },
  ],
};

export default config;
