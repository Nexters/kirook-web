import { type ReactNode } from 'react';

export function TabList({ children }: { children: ReactNode }) {
  return (
    <div role='tablist' className='flex w-full justify-center gap-1 px-[23.5px]'>
      {children}
    </div>
  );
}
