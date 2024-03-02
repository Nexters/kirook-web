'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { updateMemo } from '../../apis/memo';
import MemoItem from '../../components/MemoItem';
import useStore from '../../hooks/useStore';
import { Memo, MultiSelectOption } from '@/app/api/memos/[memoListId]/interface';
import { MemoLogo } from '@/assets/logo';
import { Icon, Navigation, Spinner } from '@/shared/components';
import dayjs from 'dayjs';

export default function MemoWritePage() {
  const router = useRouter();
  const params = useParams();
  const { memo, isLoading, fetchMemo } = useStore();

  const [value, setValue] = useState<string>('');
  const [tagValue, setTagValue] = useState<string>('');
  const [tags, setTags] = useState<MultiSelectOption[]>([]);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const val = evt.target?.value;
    setState(val);
  };

  const handleUpdate = async (memo: Memo) => {
    const accessToken = localStorage.getItem('accessToken') as string;
    const [title, ...values] = value.split('\n');
    const text = values.join('\n');
    const res = await updateMemo(accessToken, {
      id: params.memoId as string,
      title,
      text,
      tags,
      createdAt: memo.createdAt,
    });
    console.log(res);
    router.push('/memo');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      fetchMemo({ accessToken, memoId: params.memoId as string });
    }
  }, [fetchMemo, params.memoId]);

  useEffect(() => {
    const tags = memo.tags || [];
    setValue(`${memo.title}\n${memo.text}`);
    setTags(tags);
  }, [memo]);

  return (
    <>
      <div className='flex h-screen w-full flex-col bg-white px-4'>
        {/* MEMO 로고 */}
        <div className='mb-5 mt-[11px] flex items-center justify-between'>
          <Icon iconType='ChevronLeft' className='fill-none' onClick={router.back} />
          <Image src={MemoLogo} alt='memoTab_logoImage' onClick={() => router.push('/memo')} />
          <button className='bg-transparent text-base text-[#5ED236]' onClick={() => handleUpdate(memo)}>
            저장
          </button>
        </div>

        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
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
