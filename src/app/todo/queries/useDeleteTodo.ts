import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todos } from './queryKey';
import { deleteTodo } from '@/app/todo/apis/todo';

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries(todos.all);
    },
  });
}
