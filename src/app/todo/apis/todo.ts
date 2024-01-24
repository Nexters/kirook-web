import { Todo, TodoResponse } from '../../api/todo/[slug]/route';
import type { TodoListItem } from './types';
import axios from 'axios';

// TODO: 오늘 내일 구분 필요
export async function getTodoList(dbId: string, accessToken: string): Promise<Todo[]> {
  if (!dbId) {
    return [];
  }
  const res = await axios.get<TodoResponse>(`/api/todo/${dbId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const { todos } = res.data;

  return todos;
}
