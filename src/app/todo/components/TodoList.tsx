import { getTodoList } from '../apis/todo';
import { TodoListItem } from '../apis/types';
import { TodoItem } from './TodoItem';

export async function TodoList() {
  const todos = await getTodoList();

  const sorted = sortTodoListByIsFullfilled(todos);

  return (
    <ul>
      {sorted.map((todo) => (
        <li key={todo.id}>
          <TodoItem id={todo.id} isFullfilled={todo.isFullfilled} content={todo.content} />
        </li>
      ))}
    </ul>
  );
}

function sortTodoListByIsFullfilled(todos: TodoListItem[]) {
  return todos.sort((a, b) => Number(a.isFullfilled) - Number(b.isFullfilled));
}
