import { Todo } from '@/app/api/todos/[slug]/route';

export function sortTodos<T extends Todo[]>(todos: T) {
  return todos.sort((a, b) => {
    if (!a.status && b.status) return -1;

    if (a.status && !b.status) return 1;

    return +new Date(b.createdAt) - +new Date(a.createdAt);
  });
}
