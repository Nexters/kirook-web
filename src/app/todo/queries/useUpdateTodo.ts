import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todos } from './queryKey';
import { Todo } from '@/app/api/todos/[slug]/route';
import { updateTodo } from '@/app/todo/apis/todo';
import type { UpdateTodo } from '@/app/todo/apis/types';
import { sortTodos } from '@/app/todo/utils/sortTodos';

export function useUpdateTodo(when: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: UpdateTodo) => updateTodo(todo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(todos.detail(when));

      const previousTodos = queryClient.getQueryData<Todo[]>(todos.detail(when).queryKey) || [];

      queryClient.setQueryData(
        todos.detail(when).queryKey,
        sortTodos(previousTodos.map((todo) => (todo.id === newTodo.id ? (newTodo as Todo) : todo))),
      );

      return { previousTodos, newTodo };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData(todos.detail(when).queryKey, context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(todos.detail(when));
    },
  });
}
