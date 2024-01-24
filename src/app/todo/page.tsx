'use client';

import React, { useEffect, useState } from 'react';
import { TodoListContainer } from './components/TodoListContainer';
import { Navigation } from '@/shared/components';
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
    <>
      <div className='flex flex-col items-center px-[14px]'>
        <h1 className='mb-5 mt-[11px] text-xl font-bold'>To Do</h1>
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
      </div>
      <Navigation />
    </>
  );
}
