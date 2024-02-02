import { Memo } from '@/app/api/memos/[memoListId]/interface';
import axios from 'axios';

export const createMemo = async (accessToken: string, memoListId: string, memo: Omit<Memo, 'createdAt' | 'id'>) => {
  const res = await axios.post(`/api/memos/${memoListId}`, memo, {
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
