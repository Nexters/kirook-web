'use client';

import { type ReactNode } from 'react';
import { useTabs } from './useTabs';
import { cn } from '@/shared/utils/cn';

export interface TabProps {
  children: ReactNode;
  /**
   * @description Tabs내에서 자동으로 주입되는 Property로 직접 주입하지 말것
   */
  index?: number;
}

export function Tab({ children, index }: TabProps) {
  const { activeTab, selectTab } = useTabs();

  const handleTabClick = () => {
    if (index === undefined) return;

    selectTab(index);
  };

  const isActive = activeTab === index;

  return (
    <li role='tab' className='relative h-full w-full'>
      <button
        type='button'
        onClick={handleTabClick}
        disabled={isActive}
        className={cn(
          'text-grayscale-500 flex h-full w-full cursor-pointer items-center justify-center py-[22px] font-bold',
          {
            'after:bg-grayscale-900 text-black after:absolute after:bottom-[-2px] after:block after:h-[2.5px] after:w-[120px] after:rounded-lg':
              isActive,
          },
        )}
      >
        {children}
      </button>
    </li>
  );
}

Tab.displayName = 'Tab';
