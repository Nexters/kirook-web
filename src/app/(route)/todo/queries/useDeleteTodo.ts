import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todos } from './queryKey';
import { deleteTodo } from '@/app/(route)/todo/services/todo';

export function useDeleteTodo(when: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries(todos.detail(when));
    },
  });
}
