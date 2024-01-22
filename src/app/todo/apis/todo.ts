import type { TodoListItem } from './types';
import { sleep } from '@/shared/utils/sleep';

// TODO: 오늘 내일 구분 필요
export async function getTodoList() {
  const response: TodoListItem[] = [
    {
      id: 1,
      isFullfilled: false,
      content: '우유 사기',
    },
    {
      id: 2,
      isFullfilled: true,
      content: '넥스터즈 가기',
    },
    {
      id: 3,
      isFullfilled: false,
      content: '코딩하기',
    },
    {
      id: 4,
      isFullfilled: true,
      content: '맥북 지르기',
    },
    {
      id: 5,
      isFullfilled: false,
      content: '운동하기',
    },
  ];

  await sleep(1000);

  return response;
}
