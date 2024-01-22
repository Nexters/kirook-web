import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { Navigation } from '@/shared/components';
import { Tab, TabList, TabPanel, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  return (
    <>
      <div className='flex flex-col items-center px-[14px]'>
        <h1 className='mb-5 mt-[11px] text-xl font-bold'>To Do</h1>
        <Tabs initialTab='today'>
          <TabList>
            <Tab tabKey='today'>오늘</Tab>
            <Tab tabKey='tomorrow'>내일</Tab>
          </TabList>
          <TabPanel tabKey='today'>hi</TabPanel>
          <TabPanel tabKey='tomorrow'>hw</TabPanel>
        </Tabs>
        <div className='mt-[18px] flex w-full flex-col'>
          <TodoInput />
          <ul>
            {[1, 2, 3].map((todo) => (
              <li key={todo}>{<TodoItem />}</li>
            ))}
          </ul>
        </div>
      </div>
      <Navigation />
    </>
  );
}
