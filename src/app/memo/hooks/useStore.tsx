import { Memo } from '../../api/memos/[memoListId]/interface';
import { fetchMemoes, getMemoItem } from '../apis/memo';
import { create } from 'zustand';

interface Memos {
  memos: Memo[];
  memo: Memo;
  isLoading: boolean;
  fetchMemoes: (accessToken: string, memoListId: string) => void;
  fetchMemo: ({ accessToken, memoId }: { accessToken: string; memoId: string }) => void;
}

const useStore = create<Memos>((set) => ({
  memos: [],
  memo: { id: '', tags: [], title: '', text: '', createdAt: '' },
  isLoading: false,
  fetchMemoes: async (accessToken: string, memoListId: string) => {
    set({ isLoading: true });
    const response = await fetchMemoes(accessToken, memoListId);
    set({ memos: response });
    set({ isLoading: false });
  },
  fetchMemo: async ({ accessToken, memoId }: { accessToken: string; memoId: string }) => {
    set({ isLoading: true });
    const response = await getMemoItem(accessToken, memoId);
    set({ memo: response });
    set({ isLoading: false });
  },
}));

export default useStore;
