import { Todo, TodoResponse } from '../../api/todos/[slug]/route';
import { mockTodoResponse } from './mock_todo';
import type { TodoListItem } from './types';
import axios from 'axios';

// TODO: 오늘 내일 구분 필요
export async function getTodoList(dbId: string, accessToken: string): Promise<Todo[]> {
  if (!dbId || !accessToken) {
    return [];
  }

  if (process.env.NEXT_PUBLIC_ENV === 'dev') {
    const { todos } = mockTodoResponse;
    return todos;
  }
  const res = await axios.get<TodoResponse>(`/api/todos/${dbId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  const { todos } = res.data;

  return todos;
}

export async function createTodo(dbId: string, accessToken: string, text: string): Promise<Todo> {
  const created_at = new Date();
  if (!dbId || !accessToken) {
    return {} as Todo;
  }

  const res = await axios.post<Todo>(
    `/api/todos/${dbId}`,
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
