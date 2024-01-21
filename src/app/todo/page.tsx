import { Navigation } from '@/shared/components';
import { Tab, Tabs } from '@/shared/components/Tabs';

export default function Todo() {
  return (
    <>
      <h1>To Do</h1>
      <Tabs>
        <Tab>오늘</Tab>
        <Tab>내일</Tab>
      </Tabs>
      <Navigation />
    </>
  );
}
