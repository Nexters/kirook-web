import { Memo, MemoResponse } from '@/app/api/memos/[memoListId]/interface';
import axios, { AxiosResponse } from 'axios';

export const fetchMemoes = async (memoListId: string) => {
  const res = await axios.get<MemoResponse>(`/api/memos/${memoListId}`);

  return res.data.memos;
};

export const createMemo = async (memoListId: string, memo: Omit<Memo, 'createdAt' | 'id'>) => {
  const res = await axios.post(`/api/memos/${memoListId}`, memo);

  return res.data;
};
export const updateMemo = async (memo: Memo) => {
  const res = await axios.patch<Memo>(`/api/memos/memo/${memo.id}`, memo);

  return res.data;
};
export const deleteMemo = async (memoId: string) => {
  const res = await axios.delete(`/api/memos/memo/${memoId}`);

  return res.data;
};

export const getMemoItem = async (memoId: string) => {
  const res = await axios.get<Memo>(`/api/memos/memo/${memoId}`);

  return res.data;
};

export const getTags = async (memoListId: string) => {
  const res = await axios.get(`/api/memos/tags/${memoListId}`);

  return res.data;
};
