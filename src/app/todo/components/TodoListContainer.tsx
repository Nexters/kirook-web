import { Suspense } from 'react';
import React from 'react';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

interface TodoListContainerProps {
  // TODO: 오늘 내일 구분하는 프로퍼티 추가
  db: string;
  accessToken: string;
}

export function TodoListContainer({ db, accessToken }: TodoListContainerProps) {
  return (
    <div className='mt-[18px] flex w-full flex-col'>
      <TodoInput />
      {/* TODO: 일단 로딩 ui 없으니까 대충 처리 */}
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList db={db} accessToken={accessToken} />
      </Suspense>
    </div>
  );
}
