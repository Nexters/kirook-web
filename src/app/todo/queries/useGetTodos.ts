'use client';

import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { todos } from './queryKey';
import { getTodoList } from '@/app/todo/apis/todo';

export const useGetTodos = () => {
  const [todolistId, setTodolistId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('todo');
    if (!id) return;

    setTodolistId(id);
  }, []);

  return useSuspenseQuery({
    ...todos.all(todolistId!),
    queryFn: () => getTodoList(todolistId),
  });
};
