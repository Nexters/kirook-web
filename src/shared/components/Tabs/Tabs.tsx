'use client';

import {
  Children,
  type ReactElement,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Tab, type TabProps } from './Tab';
import { TabsContext } from './TabsContext';

export interface TabsProps {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  onChangeTab?: (index: number) => void;
}

export function Tabs({ children, onChangeTab }: TabsProps) {
  const childrenToArray = Children.toArray(children);

  // TODO: 왜 displayName이 undefined 인지 모르겠지만, Tab만 children으로 받을 수 있도록 예외 처리해야함
  // for (const child of childrenToArray) {
  //   console.log(Tab.displayName, child.displayName, child.type.displayName);
  //   if (isValidElement(child) && typeof child.type === 'function' && child.type.name === Tab.displayName) continue;

  //   throw new Error('Tabs 컴포넌트의 자식은 Tab 컴포넌트만 가능합니다.');
  // }

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
      <ul role='tablist' className='flex w-full justify-center gap-1 px-[23.5px]'>
        {tabs}
      </ul>
    </TabsContext.Provider>
  );
}
