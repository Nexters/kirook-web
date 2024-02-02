import { TodoListContainer } from './components/TodoListContainer';
import { Tab, TabList, TabPanel, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  return (
    <Tabs initialTab='today'>
      <TabList>
        <Tab tabKey='today'>오늘</Tab>
        <Tab tabKey='tomorrow'>내일</Tab>
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
