import { Memo } from '@/app/api/memos/[memoListId]/interface';
import axios from 'axios';

export const createMemo = async (accessToken: string, memoListId: string, memo: Omit<Memo, 'createdAt'>) => {
  const res = await axios.post(`/api/memos/${memoListId}`, memo, {
    headers: {
      Authorization: accessToken,
    },
  });

  return res.data;
};
