'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MemoItem from '../../components/MemoItem';
import useStore from '../../hooks/useStore';
import { MemoLogo } from '@/assets/logo';
import { Icon, Navigation } from '@/shared/components';
import dayjs from 'dayjs';

export default function MemoWritePage() {
  const router = useRouter();
  const params = useParams();
  const { memo, isLoading, fetchMemo } = useStore();

  const [value, setValue] = useState<string>('');
  const [tagValue, setTagValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const val = evt.target?.value;
    setState(val);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      fetchMemo({ accessToken, memoId: params.memoId as string });
    }
  }, [fetchMemo, params.memoId]);

  useEffect(() => {
    const tags = memo.tags.map((tag) => tag.name) || [];
    setValue(memo.text);
    setTags(tags);
  }, [memo]);

  return (
    <>
      <div className='flex h-screen w-full flex-col bg-white px-4'>
        {/* MEMO 로고 */}
        <div className='mb-5 mt-[11px] flex items-center justify-between'>
          <Icon iconType='ChevronLeft' className='fill-none' onClick={router.back} />
          <Image src={MemoLogo} alt='memoTab_logoImage' onClick={() => router.push('/memo')} />
          <button className='bg-transparent text-base text-[#5ED236]' disabled>
            저장
          </button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <MemoItem
            date={dayjs(new Date(memo.createdAt)).format('YYYY년 MM월 DD일')}
            value={value}
            tagValue={tagValue}
            tags={tags}
            onTextChange={(e) => handleChange(e, setValue)}
            onTagChange={(e) => handleChange(e, setTagValue)}
          />
        )}
      </div>
      <Navigation />
    </>
  );
}
