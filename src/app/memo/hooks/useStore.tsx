import { Memo, MultiSelectOption } from '../../api/memos/[memoListId]/interface';
import { fetchMemoes, getMemoItem, getTags } from '../apis/memo';
import { create } from 'zustand';

interface Memos {
  memos: Memo[];
  memo: Memo;
  tags: MultiSelectOption[];
  isLoading: boolean;
  fetchMemoes: (accessToken: string, memoListId: string) => void;
  fetchMemo: ({ accessToken, memoId }: { accessToken: string; memoId: string }) => void;
  fetchTags: (accessToken: string, memoListId: string) => void;
}

const useStore = create<Memos>((set) => ({
  memos: [],
  memo: { id: '', tags: [], title: '', text: '', createdAt: '' },
  tags: [],
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

  fetchTags: async (accessToken, memoListId) => {
    set({ isLoading: true });
    const response = await getTags(accessToken, memoListId);
    set({ tags: response });
    set({ isLoading: false });
  },
}));

export default useStore;
