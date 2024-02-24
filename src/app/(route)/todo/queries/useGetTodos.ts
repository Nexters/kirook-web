import { useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { todos } from './queryKey';
import { getTodoList } from '@/app/(route)/todo/apis/todo';
import { sortTodos } from '@/app/(route)/todo/utils/sortTodos';
import { Todo } from '@/app/api/todos/[slug]/route';

export function useGetTodos() {
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
}

export function useGetTodosV2() {
  const [todolistId, setTodolistId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('todo');
    if (!id) return;

    setTodolistId(id);
  }, []);

  return useQueries({
    queries: [
      {
        ...todos.detail('today'),
        queryFn: () => getTodoList(todolistId, true),
        enabled: !!todolistId,
        select: (todos: Todo[]) => sortTodos(todos),
      },
      {
        ...todos.detail('tomorrow'),
        queryFn: () => getTodoList(todolistId, false),
        enabled: !!todolistId,
        select: (todos: Todo[]) => sortTodos(todos),
      },
    ],
  });
}
