'use client';

import { useEffect, useState } from 'react';
import { TodoListContainer } from './components/TodoListContainer';
import { Tab, TabList, TabPanel, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  const [db, setDB] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    const db = localStorage.getItem('todo') || '';
    const token = localStorage.getItem('accessToken') || '';
    setDB(db);
    setToken(token);
  }, []);

  return (
    <Tabs initialTab='today'>
      <TabList>
        <Tab tabKey='today'>오늘</Tab>
        <Tab tabKey='tomorrow'>내일</Tab>
      </TabList>
      <TabPanel tabKey='today'>
        <TodoListContainer db={db} accessToken={token} />
      </TabPanel>
      <TabPanel tabKey='tomorrow'>
        <TodoListContainer db={db} accessToken={token} />
      </TabPanel>
    </Tabs>
  );
}
