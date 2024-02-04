'use client';

import { TodoItem } from './TodoItem';
import { Todo } from '@/app/api/todos/[slug]/route';
import { useGetTodos } from '@/app/todo/queries/useGetTodos';

export function TodoList() {
  const { data: todos } = useGetTodos();
  const sorted = sortTodoListByIsFullfilled(todos || []);

  return (
    <ul>
      {sorted.map((todo) => (
        <li key={todo.id}>
          <TodoItem id={todo.id} isFullfilled={todo.status} content={todo.text} />
        </li>
      ))}
    </ul>
  );
}

function sortTodoListByIsFullfilled(todos: Todo[]) {
  return todos.sort((a, b) => Number(a.status) - Number(b.status));
}
