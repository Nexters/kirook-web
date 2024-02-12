'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createMemo } from '../apis/memo';
import MemoItem from '../components/MemoItem';
import { MemoLogo } from '@/assets/logo';
import { Icon, Navigation } from '@/shared/components';
import dayjs from 'dayjs';

export default function MemoWritePage() {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const [tagValue, setTagValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [token, setToken] = useState('');
  const [memoListId, setId] = useState('');

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const val = evt.target?.value;
    setState(val);
  };

  const handleAdd = () => {
    setTags((prev) => [tagValue, ...prev]);
    setTagValue('');
  };

  const handleDelete = (tag: string) => {
    const filteredTags = tags.filter((val) => val !== tag);
    setTags(filteredTags);
  };

  const handlePost = async () => {
    const res = await createMemo(token, memoListId, {
      tags: tags.map((t) => ({ color: 'gray', name: t })),
      title: '제목입니다',
      text: value,
    });
    console.log(res);

    router.push('/memo');
  };

  useEffect(() => {
    const t = localStorage.getItem('accessToken');
    const m = localStorage.getItem('memo');

    if (t && m) {
      setToken(t);
      setId(m);
    }
  }, []);

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
