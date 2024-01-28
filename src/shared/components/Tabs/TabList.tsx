import { type ReactNode } from 'react';

export function TabList({ children }: { children: ReactNode }) {
  return (
    <div role='tablist' className='text-title2 flex w-full justify-center gap-1 px-[24.5px]'>
      {children}
    </div>
  );
}
