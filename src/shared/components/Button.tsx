import { type ButtonHTMLAttributes } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const button = tv({
  base: 'w-full rounded-lg py-3.5 text-title1',
  variants: {
    color: {
      primary: 'bg-grayscale-150 text-grayscale-900',
      secondary: 'bg-black text-white',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, color, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={button({ color })} {...rest}>
      {children}
    </button>
  );
}
