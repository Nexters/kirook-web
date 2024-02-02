'use client';

import { TodoListContainer } from './components/TodoListContainer';
import { useGetTodos } from './queries/useGetTodos';
import { Tab, TabList, TabPanel, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  const { data: todos } = useGetTodos();

  return (
    <Tabs initialTab='today'>
      <TabList>
        <Tab tabKey='today'>오늘 {todos.length}</Tab>
        <Tab tabKey='tomorrow'>내일 {todos.length}</Tab>
      </TabList>
      <TabPanel tabKey='today'>
        <TodoListContainer />
      </TabPanel>
      <TabPanel tabKey='tomorrow'>
        <TodoListContainer />
      </TabPanel>
    </Tabs>
  );
}
