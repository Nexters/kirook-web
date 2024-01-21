'use client';

import { Children, type ReactElement, cloneElement, useCallback, useEffect, useMemo, useState } from 'react';
import { type TabProps } from './Tab';
import { TabsContext } from './TabsContext';

export interface TabsProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  onChangeTab?: (index: number) => void;
}

export function Tabs({ children, onChangeTab }: TabsProps) {
  const childrenToArray = Children.toArray([children]);

  for (const child of childrenToArray) {
    console.log(child);
  }

  const [activeTab, setActiveTab] = useState(0);

  const selectTab = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  useEffect(() => {
    onChangeTab?.(activeTab);
  }, [activeTab]);

  const tabs = Children.map(children, (child, index) => {
    return cloneElement(child, {
      index,
    });
  });

  const contextValue = useMemo(
    () => ({
      activeTab,
      selectTab,
    }),
    [activeTab, selectTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <ul>{tabs}</ul>
    </TabsContext.Provider>
  );
}
