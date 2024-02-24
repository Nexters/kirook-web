import { type ReactNode } from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

const tag = tv({
  base: 'flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-body2 text-grayscale-900',
  variants: {
    color: {
      red: 'bg-tag-red',
      yellow: 'bg-tag-yellow',
      green: 'bg-tag-green',
      blue: 'bg-tag-blue',
      purple: 'bg-tag-purple',
      gray: 'bg-tag-gray',
    },
  },
  defaultVariants: {
    color: 'gray',
  },
});

interface TagBaseProps {
  children: ReactNode;
}

type TagVariants = VariantProps<typeof tag>;
type TagProps = TagVariants & TagBaseProps;

export function Tag({ children, color }: TagProps) {
  return <div className={tag({ color })}>{children}</div>;
}
