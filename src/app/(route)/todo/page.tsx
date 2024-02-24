'use client';

import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoTabLabel } from './components/TodoTabLabel';
import { useGetTodosV2 } from './queries/useGetTodos';
import { TodoLogo } from '@/assets/logo';
import { Loading } from '@/shared/components/Loading';
import { Tab, TabList, TabPanel, Tabs } from '@/shared/components/Tabs';

export default function TodoPage() {
  const [
    { isLoading: isTodosTodayLoading, data: todosToday },
    { isLoading: isTodosTomorrowLoading, data: todosTomorrow },
  ] = useGetTodosV2();

  return (
    <>
      <div className='flex flex-col items-center px-[14px]'>
        <h1 className='mb-5 mt-[12px]'>
          <TodoLogo role='img' aria-describedby='todo-logo' />
        </h1>
        <Tabs initialTab='today'>
          <TabList>
            <Tab tabKey='today'>
              {(isActive) => <TodoTabLabel label='오늘' todoCount={todosToday?.length} isActive={isActive} />}
            </Tab>
            <Tab tabKey='tomorrow'>
              {(isActive) => <TodoTabLabel label='내일' todoCount={todosTomorrow?.length} isActive={isActive} />}
            </Tab>
          </TabList>
          <TabPanel tabKey='today'>
            <div className='mt-[18px] flex w-full flex-col'>
              <TodoInput />
              {todosToday && <TodoList todos={todosToday} />}
            </div>
          </TabPanel>
          <TabPanel tabKey='tomorrow'>
            <div className='mt-[18px] flex w-full flex-col'>
              <TodoInput />
              {todosTomorrow && <TodoList todos={todosTomorrow} />}
            </div>
          </TabPanel>
        </Tabs>
      </div>
      {(isTodosTodayLoading || isTodosTomorrowLoading) && <Loading />}
    </>
  );
}
