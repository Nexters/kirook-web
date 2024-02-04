'use client';

import { TodoItem } from './TodoItem';
import { Todo } from '@/app/api/todos/[slug]/route';
import { sortTodos } from '@/app/todo/utils/sortTodos';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  const sorted = sortTodos(todos);

  return (
    <ul>
      {sorted.map((todo) => (
        <li key={todo.id}>
          <TodoItem id={todo.id} isFullfilled={todo.status} content={todo.text} createdAt={todo.createdAt} />
        </li>
      ))}
    </ul>
  );
}
