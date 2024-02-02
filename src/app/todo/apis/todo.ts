import { cache } from 'react';
import type { UpdateTodo } from './types';
import { Todo, TodoResponse } from '@/app/api/todos/[slug]/route';
import http from '@/shared/utils/fetch';

export const getTodoList = async (todolistId?: string, isToday: boolean = true) => {
  if (!todolistId) {
    return [];
  }
  const url = isToday ? `/api/todos/today/${todolistId}` : `/api/todos/tomorrow/${todolistId}`;
  const response = await http.get<TodoResponse>(url);
  const { todos } = response;

  return todos;
};

export async function createTodo(accessToken: string, todolistId: string, text: string, isToday: boolean = true) {
  const created_at = new Date();
  if (!todolistId || !accessToken) {
    return {} as Todo;
  }

  const url = isToday ? `/api/todos/today/${todolistId}` : `/api/todos/tomorrow/${todolistId}`;
  const response = await http.post<Todo>(
    url,
    {
      created_at,
      status: false,
      text,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );

  return response;
}
export async function updateTodo(accessToken: string, todo: UpdateTodo) {
  if (!todo || !accessToken) {
    return {} as Todo;
  }

  const { id, ...rest } = todo;

  const response = await http.patch<Todo>(`/api/todos/todo/${id}`, rest, {
    headers: {
      Authorization: accessToken,
    },
  });

  return response;
}

export const deleteTodo = async (accessToken: string, todoId: string) => {
  const response = await http.delete(
    `/api/todos/todo/${todoId}`,
    {},
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );

  return response;
};
