import { TodoInput } from './components/TodoInput';
import { Navigation } from '@/shared/components';
import { Tab, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  return (
    <>
      <div className='flex flex-col items-center px-[14px]'>
        <h1 className='mb-5 mt-[11px] text-xl font-bold'>To Do</h1>
        <Tabs>
          <Tab>오늘</Tab>
          <Tab>내일</Tab>
        </Tabs>
        <div className='mt-[18px] flex w-full flex-col'>
          <TodoInput />
        </div>
      </div>
      <Navigation />
    </>
  );
}
