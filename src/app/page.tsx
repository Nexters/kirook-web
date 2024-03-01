'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { NotionLogo } from '@/assets/logo';
import SimpleSlider from '@/shared/components/carousel';

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
      <div className='mb-12 w-full pt-6'>
        <SimpleSlider />
      </div>
      <div className='flex flex-col items-center justify-around'>
        <button className='rounded-lg bg-black px-14 py-4 text-white'>
          <a href={process.env.NEXT_PUBLIC_AUTH_URL}>
            <div className='flex gap-2'>
              <Image src={NotionLogo} alt='notion logo' className='h-5 w-5' />
              <h4 className='header1'>Notion 연동하고 시작하기</h4>
            </div>
          </a>
        </button>
      </div>
    </main>
  );
}
