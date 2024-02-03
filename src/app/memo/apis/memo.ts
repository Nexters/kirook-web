import { Memo, MemoResponse } from '@/app/api/memos/[memoListId]/interface';
import axios, { AxiosResponse } from 'axios';

export const fetchMemoes = async (accessToken: string, memoListId: string) => {
  const res = await axios.get<MemoResponse>(`/api/memos/${memoListId}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  return res.data.memos;
};

export const createMemo = async (accessToken: string, memoListId: string, memo: Omit<Memo, 'createdAt' | 'id'>) => {
  const res = await axios.post(`/api/memos/${memoListId}`, memo, {
    headers: {
      Authorization: accessToken,
    },
  });

  return res.data;
};
export const updateMemo = async (accessToken: string, memo: Memo) => {
  const res = await axios.patch<Memo>(`/api/memos/memo/${memo.id}`, memo, {
    headers: {
      Authorization: accessToken,
    },
  });

  return res.data;
};
export const deleteMemo = async (accessToken: string, memoId: string) => {
  const res = await axios.delete(`/api/memos/memo/${memoId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return res.data;
};

export const getMemoItem = async (accessToken: string, memoId: string) => {
  const res = await axios.get<Memo>(`/api/memos/memo/${memoId}`, {
    headers: {
      Authorization: accessToken,
    },
  });

  return res.data;
};
