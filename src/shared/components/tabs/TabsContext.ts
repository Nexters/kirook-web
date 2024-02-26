'use client';

import { createContext } from 'react';
import { type TabKey } from './types';

interface TabsContext {
  activeTab: TabKey;

  selectTab(key: TabKey): void;
}

export const TabsContext = createContext<TabsContext | null>(null);
