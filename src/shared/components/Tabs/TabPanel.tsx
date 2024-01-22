'use client';

import { type ReactNode } from 'react';
import { type TabKey } from './types';
import { useTabs } from './useTabs';

interface TabPanelProps {
  children?: ReactNode;
  tabKey: TabKey;
}

export function TabPanel({ children, tabKey }: TabPanelProps) {
  const { activeTab } = useTabs();

  if (activeTab !== tabKey) return null;

  return (
    <div role='tabpanel' id={`tabpanel-${tabKey}`} aria-labelledby={`tablist-${tabKey}`} className='w-full'>
      {children}
    </div>
  );
}
