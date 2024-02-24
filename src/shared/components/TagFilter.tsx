import { MouseEventHandler, type ReactNode } from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

export type TagFilterColors = 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray';

const tagFilter = tv({
  base: 'cursor-pointer whitespace-nowrap rounded-xl px-3 py-1 text-title3 text-grayscale-900',
  variants: {
    color: {
      red: 'bg-tag-red',
      yellow: 'bg-tag-yellow',
      green: 'bg-tag-green',
      blue: 'bg-tag-blue',
      purple: 'bg-tag-purple',
      gray: 'bg-tag-gray',
    },
    isSelected: {
      true: 'bg-black text-title2 text-white',
    },
  },
  defaultVariants: {
    color: 'gray',
    isSelected: false,
  },
});

interface TagFilterBaseProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

type TagFilterVariants = VariantProps<typeof tagFilter>;
type TagFilterProps = TagFilterVariants & TagFilterBaseProps;

export function TagFilter({ children, isSelected, color, onClick }: TagFilterProps) {
  return (
    <div className={tagFilter({ color, isSelected })} onClick={onClick}>
      {children}
    </div>
  );
}
