import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todos } from './queryKey';
import { updateTodo } from '@/app/todo/apis/todo';
import type { UpdateTodo } from '@/app/todo/apis/types';

export function useUpdateTodo(when: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: UpdateTodo) => updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(todos.detail(when));
    },
  });
}
