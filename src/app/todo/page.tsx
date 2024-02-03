'use client';

import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoTabLabel } from './components/TodoTabLabel';
import { useGetTodos } from './queries/useGetTodos';
import { TodoLogo } from '@/assets/logo';
import { Navigation } from '@/shared/components';
import { Tab, TabList, TabPanel, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  const { isLoading, data: todos } = useGetTodos();

  return (
    <>
      {isLoading && <div className='absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-20'>로딩임니다..</div>}
      <div className='flex flex-col items-center px-[14px]'>
        <h1 className='mb-5 mt-[12px]'>
          <TodoLogo role='img' aria-describedby='todo-logo' />
        </h1>
        <Tabs initialTab='today'>
          <TabList>
            <Tab tabKey='today'>
              {(isActive) => <TodoTabLabel label='오늘' todoCount={todos?.length} isActive={isActive} />}
            </Tab>
            <Tab tabKey='tomorrow'>
              {(isActive) => <TodoTabLabel label='내일' todoCount={todos?.length} isActive={isActive} />}
            </Tab>
          </TabList>
          <TabPanel tabKey='today'>
            <div className='mt-[18px] flex w-full flex-col'>
              <TodoInput />
              <TodoList />
            </div>
          </TabPanel>
          <TabPanel tabKey='tomorrow'>
            <div className='mt-[18px] flex w-full flex-col'>
              <TodoInput />
              <TodoList />
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Navigation />
    </>
  );
}
