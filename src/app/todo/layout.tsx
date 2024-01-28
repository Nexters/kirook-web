import { TodoLogo } from '@/assets/logo';
import { Navigation } from '@/shared/components';

export default function TodoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='flex flex-col items-center px-[14px]'>
        <h1 className='mb-5 mt-[12px]'>
          <TodoLogo role='img' aria-describedby='todo-logo' />
        </h1>
        {children}
      </div>
      <Navigation />
    </>
  );
}
