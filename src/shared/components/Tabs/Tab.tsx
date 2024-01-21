import { type ReactNode } from 'react';
import { useTabs } from './useTabs';

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
    if (!index) return;

    selectTab(index);
  };

  const isActive = activeTab === index;

  return (
    <li>
      <button type='button' onClick={handleTabClick} disabled={isActive}>
        {children}
      </button>
    </li>
  );
}
