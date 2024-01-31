'use client';

import React, { useEffect } from 'react';
import { Navigation } from '@/shared/components';

export default function Home() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV === 'dev' && !localStorage.getItem('accessToken')) {
      const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || '';
      const todo = process.env.NEXT_PUBLIC_TODO || '';
      const memo = process.env.NEXT_PUBLIC_MEMO || '';
      const link = process.env.NEXT_PUBLIC_LINK || '';

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('todo', todo);
      localStorage.setItem('memo', memo);
      localStorage.setItem('link', link);
    }
  }, []);
  return (
    <main>
      <p className='text-[24px] font-semibold'>세상에 이런 폰트가 나오다니 천재인듯</p>
      <Navigation />
      <button className='rounded-sm border-2 border-black p-6 hover:bg-gray-200'>
        <a href={process.env.NEXT_PUBLIC_AUTH_URL}>노션 연동하기</a>
      </button>
    </main>
  );
}
