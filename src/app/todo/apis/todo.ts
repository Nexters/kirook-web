import { Todo, TodoResponse } from '../../api/todos/[slug]/route';
import { mockTodoResponse } from './mock_todo';
import type { TodoListItem, UpdateTodo } from './types';
import axios from 'axios';

// TODO: 오늘 내일 구분 필요
export async function getTodoList(accessToken: string, todolistId: string): Promise<Todo[]> {
  if (!todolistId || !accessToken) {
    return [];
  }

  const res = await axios.get<TodoResponse>(`/api/todos/${todolistId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  const { todos } = res.data;

  return todos;
}

export async function createTodo(accessToken: string, todolistId: string, text: string): Promise<Todo> {
  const created_at = new Date();
  if (!todolistId || !accessToken) {
    return {} as Todo;
  }

  const res = await axios.post<Todo>(
    `/api/todos/${todolistId}`,
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
  return res.data;
}
export async function updateTodo(accessToken: string, todo: UpdateTodo): Promise<Todo> {
  if (!todo || !accessToken) {
    return {} as Todo;
  }

  const { id, ...rest } = todo;

  const res = await axios.post<Todo>(`/api/todos/todo/${id}`, rest, {
    headers: {
      Authorization: accessToken,
    },
  });
  return res.data;
}
