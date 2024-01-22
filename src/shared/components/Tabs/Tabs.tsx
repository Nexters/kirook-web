'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { TabsContext } from './TabsContext';
import { TabKey } from './types';

export interface TabsProps {
  children: ReactNode;
  initialTab: TabKey;
  onChangeTab?: (tabKey: TabKey) => void;
}

export function Tabs({ children, initialTab, onChangeTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const selectTab = useCallback((tabKey: TabKey) => {
    setActiveTab(tabKey);
  }, []);

  useEffect(() => {
    onChangeTab?.(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const contextValue = useMemo(
    () => ({
      activeTab,
      selectTab,
    }),
    [activeTab, selectTab],
  );

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
}
