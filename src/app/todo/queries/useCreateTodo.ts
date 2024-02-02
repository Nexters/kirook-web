'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todos } from './queryKey';
import { createTodo } from '@/app/todo/apis/todo';

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const [todolistId, setTodolistId] = useState<string>();

  useEffect(() => {
    const id = localStorage.getItem('todo');
    if (!id) return;

    setTodolistId(id);
  }, []);

  return useMutation({
    mutationFn: async (text: string) => createTodo(text, todolistId),
    onSuccess: () => {
      queryClient.invalidateQueries(todos.all(todolistId!));

      alert('Todo created!');
    },
  });
}
