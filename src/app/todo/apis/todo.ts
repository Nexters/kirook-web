import { Todo, TodoResponse } from '../../api/todos/[slug]/route';
import { mockTodoResponse } from './mock_todo';
import type { TodoListItem, UpdateTodo } from './types';
import axios from 'axios';

// TODO: 오늘 내일 구분 필요
export async function getTodoList(accessToken: string, todolistId: string, isToday: boolean = true): Promise<Todo[]> {
  if (!todolistId || !accessToken) {
    return [];
  }

  const url = isToday ? `/api/todos/today/${todolistId}` : `/api/todos/tomorrow/${todolistId}`;

  const res = await axios.get<TodoResponse>(url, {
    headers: {
      Authorization: accessToken,
    },
  });
  const { todos } = res.data;

  return todos;
}

export async function createTodo(
  accessToken: string,
  todolistId: string,
  text: string,
  isToday: boolean = true,
): Promise<Todo> {
  const created_at = new Date();
  if (!todolistId || !accessToken) {
    return {} as Todo;
  }

  const url = isToday ? `/api/todos/today/${todolistId}` : `/api/todos/tomorrow/${todolistId}`;
  const res = await axios.post<Todo>(
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

export const deleteTodo = async (accessToken: string, todoId: string) => {
  const res = await axios.delete(`/api/todos/todo/${todoId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return res.data;
};
