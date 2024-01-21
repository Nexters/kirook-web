// 'use client';
import { createContext } from 'react';

interface TabsContext {
  activeTab: number;

  selectTab(index: number): void;
}

export const TabsContext = createContext<TabsContext | null>(null);
