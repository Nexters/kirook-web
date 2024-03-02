'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createMemo } from '../apis/memo';
import MemoItem from '../components/MemoItem';
import { MultiSelectOption } from '@/app/api/memos/[memoListId]/interface';
import { MemoLogo } from '@/assets/logo';
import { Icon, Navigation } from '@/shared/components';
import dayjs from 'dayjs';

export default function MemoWritePage() {
  const router = useRouter();
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

  const handleAdd = (color: string = 'gray') => {
    setTags((prev) => [{ name: tagValue, color }, ...prev]);
    setTagValue('');
  };

  const handleDelete = (tag: string) => {
    const filteredTags = tags.filter((val) => val.name !== tag);
    setTags(filteredTags);
  };

  const handlePost = async () => {
    const [title, ...values] = value.split('\n');
    const text = values.join('\n');

    const memolistId = localStorage.getItem('memo');
    if (!memolistId) {
      return;
    }

    const res = await createMemo(memolistId, {
      tags,
      title,
      text,
    });
    console.log(res);

    router.push('/memo');
  };

  return (
    <>
      <div className='flex h-screen w-full flex-col bg-white px-4'>
        {/* MEMO 로고 */}
        <div className='mb-5 mt-[11px] flex items-center justify-between'>
          <Icon iconType='ChevronLeft' className='fill-none' onClick={router.back} />
          <Image src={MemoLogo} alt='memoTab_logoImage' onClick={() => router.push('/memo')} />
          <button className='bg-transparent text-base text-[#5ED236]' onClick={handlePost}>
            저장
          </button>
        </div>

        <MemoItem
          date={dayjs(new Date()).format('YYYY년 MM월 DD일')}
          value={value}
          tagValue={tagValue}
          tags={tags}
          onTextChange={(e) => handleChange(e, setValue)}
          onTagChange={(e) => handleChange(e, setTagValue)}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      </div>
      <Navigation />
    </>
  );
}
