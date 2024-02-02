import { createQueryKeys } from '@lukemorales/query-key-factory';

export const todos = createQueryKeys('todos', {
  all: (todolistId: string) => [todolistId],
});