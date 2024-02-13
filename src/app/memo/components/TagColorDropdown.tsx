import React from 'react';
import { cn } from '@/shared/utils/cn';

interface DropdownProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const colors = [
  { name: '회색', value: 'gray', color: '#e5e5ef' },
  { name: '빨간색', value: 'red', color: '#ffe0e0' },
  { name: '노란색', value: 'yellow', color: '#FFF0D4' },
  { name: '초록색', value: 'green', color: '#D4F1E0' },
  { name: '파란색', value: 'blue', color: '#E1EDFF' },
  { name: '보라색', value: 'purple', color: '#EBDFFF' },
  { name: '분홍색', value: 'pink', color: '#FFE4F9' },
];

const TagColorDropdown = ({ color, setColor, setIsOpen, className }: DropdownProps) => {
  const handleClick = (color: string) => {
    setColor(color);
    setIsOpen(false);
  };
  return (
    <div className={cn('w-[10rem] flex-col gap-[0.125rem] rounded bg-white py-1 shadow-2xl', className)}>
      {colors.map((item) => (
        <div
          key={item.value}
          className={cn('flex gap-2 bg-black px-2 py-1', { 'bg-white': !(item.value === color) })}
          onClick={() => handleClick(item.value)}
        >
          <div className={`bg-tag-${item.value} h-6 w-6 rounded-full border-gray-400`}></div>
          <p
            className={cn('text-grayscale-800', 'text-body1 text-grayscale-800', {
              'text-white': item.value === color,
            })}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TagColorDropdown;
