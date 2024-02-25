import { Todo } from '@/app/api/todos/[slug]/route';

export interface TodoListItem {
  id: number;
  isFullfilled: boolean;
  content: string;
}

export interface UpdateTodo extends Partial<Todo> {
  id: string;
}
