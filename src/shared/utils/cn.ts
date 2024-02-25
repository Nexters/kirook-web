import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': [
        'text-logo',
        'text-header1',
        'text-title1',
        'text-title2',
        'text-title3',
        'text-body1',
        'text-body2',
        'text-text',
        'text-button',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
