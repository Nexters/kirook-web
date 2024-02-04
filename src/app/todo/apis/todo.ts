import type { UpdateTodo } from './types';
import { Todo, TodoResponse } from '@/app/api/todos/[slug]/route';
import http from '@/shared/utils/fetch';

export async function getTodoList(todolistId?: string, isToday: boolean = true) {
  if (!todolistId) {
    return [];
  }
  const url = isToday ? `/api/todos/today/${todolistId}` : `/api/todos/tomorrow/${todolistId}`;
  const response = await http.get<TodoResponse>(url);
  const { todos } = response;

  return todos;
}

export async function createTodo(text: string, todolistId?: string, isToday: boolean = true) {
  if (!todolistId) {
    return {} as Todo;
  }

  const url = isToday ? `/api/todos/today/${todolistId}` : `/api/todos/tomorrow/${todolistId}`;
  const response = await http.post<Todo>(url, {
    created_at: new Date(),
    status: false,
    text,
  });

  return response;
}
export async function updateTodo(todo: UpdateTodo) {
  if (!todo) {
    return {} as Todo;
  }

  const { id, ...rest } = todo;

  const response = await http.patch<Todo>(`/api/todos/todo/${id}`, rest);

  return response;
}

export async function deleteTodo(todoId: string) {
  const response = await http.delete(`/api/todos/todo/${todoId}`, {});

  return response;
}
