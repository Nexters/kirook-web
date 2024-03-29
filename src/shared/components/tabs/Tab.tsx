'use client';

import { type ReactNode } from 'react';
import { type TabKey } from './types';
import { useTabs } from './useTabs';
import { cn } from '@/shared/utils/cn';

export interface TabProps {
  children(isActive: boolean): ReactNode;
  tabKey: TabKey;
}

export function Tab({ children, tabKey }: TabProps) {
  const { activeTab, selectTab } = useTabs();

  const isActive = activeTab === tabKey;

  return (
    <button
      role='tab'
      id={`tablist-${tabKey}`}
      aria-controls={`tabpanel-${tabKey}`}
      aria-selected={isActive}
      type='button'
      onClick={() => selectTab(tabKey)}
      disabled={isActive}
      className={cn(
        'relative flex w-full cursor-pointer items-center justify-center py-[22px] text-grayscale-500 after:absolute after:bottom-[-2px] after:block after:h-[2.5px] after:w-[120px] after:rounded-lg after:bg-transparent',
        {
          'text-black transition-colors duration-500 after:bg-grayscale-900 after:transition-colors after:duration-500':
            isActive,
        },
      )}
    >
      {children(isActive)}
    </button>
  );
}
