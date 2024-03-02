import { Memo, MultiSelectOption } from '../../../api/memos/[memoListId]/interface';
import { fetchMemoes, getMemoItem, getTags } from '../apis/memo';
import { create } from 'zustand';

interface Memos {
  memos: Memo[];
  memo: Memo;
  tags: MultiSelectOption[];
  isLoading: boolean;
  fetchMemoes: (memoListId: string) => void;
  fetchMemo: ({ memoId }: { memoId: string }) => void;
  fetchTags: (memoListId: string) => void;
}

const useStore = create<Memos>((set) => ({
  memos: [],
  memo: { id: '', tags: [], title: '', text: '', createdAt: '' },
  tags: [],
  isLoading: false,

  fetchMemoes: async (memoListId: string) => {
    set({ isLoading: true });
    const response = await fetchMemoes(memoListId);
    set({ memos: response });
    set({ isLoading: false });
  },

  fetchMemo: async ({ memoId }: { memoId: string }) => {
    set({ isLoading: true });
    const response = await getMemoItem(memoId);
    set({ memo: response });
    set({ isLoading: false });
  },

  fetchTags: async (memoListId) => {
    set({ isLoading: true });
    const response = await getTags(memoListId);
    set({ tags: response });
    set({ isLoading: false });
  },
}));

export default useStore;
