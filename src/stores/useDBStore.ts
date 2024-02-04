import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DBState {
  todoId: string | null;
  memoId: string | null;
  linkId: string | null;

  setDB(todoId: string, memoId: string, linkId: string): void;
}

export const useDBStore = create(
  persist<DBState>(
    (set) => ({
      todoId: null,
      memoId: null,
      linkId: null,

      setDB: (todoId: string, memoId: string, linkId: string) => set({ todoId, memoId, linkId }),
    }),
    {
      name: 'db',
    },
  ),
);
