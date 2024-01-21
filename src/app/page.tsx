'use client';

import React from 'react';
import { Navigation } from '@/shared/components';

export default function Home() {
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
