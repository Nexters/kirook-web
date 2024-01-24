'use client';

import React from 'react';
import { Todo } from '../../api/todo/[slug]/route';
import { getTodoList } from '../apis/todo';
import { TodoItem } from './TodoItem';

interface TodoProps {
  db: string;
}

export async function TodoList({ db }: TodoProps) {
  const todos = await getTodoList(db);

  const sorted = sortTodoListByIsFullfilled(todos);

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
