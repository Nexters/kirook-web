import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { todos } from './queryKey';
import { getTodoList } from '@/app/todo/apis/todo';

export const useGetTodos = () => {
  const [todolistId, setTodolistId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('todo');
    if (!id) return;

    setTodolistId(id);
  }, []);

  return useQuery({
    ...todos.all,
    queryFn: () => getTodoList(todolistId, true),
    enabled: !!todolistId,
    select: (data) => data,
  });
};
