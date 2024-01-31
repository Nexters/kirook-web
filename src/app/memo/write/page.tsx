'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createMemo } from '../apis/memo';
import useAutosizeTextArea from '../hooks/useAutosizeTextArea';
import { MemoLogo } from '@/assets/logo';
import { Icon, Navigation } from '@/shared/components';
import dayjs from 'dayjs';

export default function MemoWritePage() {
  const [value, setValue] = useState<string>('');
  const [tagValue, setTagValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [token, setToken] = useState('');
  const [memoListId, setId] = useState('');

  useAutosizeTextArea(textAreaRef.current, value);

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
          <Icon iconType='ChevronLeft' className='fill-none' />
          <Image src={MemoLogo} alt='memoTab_logoImage' className='' />
          <button className='bg-transparent text-base text-[#5ED236]' onClick={handlePost}>
            저장
          </button>
        </div>

        {/* 오늘 날짜 */}
        <div className='text-grayscale-700 py-2 text-[0.625rem]'>{dayjs(new Date()).format('YYYY년 MM월 DD일')}</div>

        {/* 텍스트 인풋 영역 */}
        <textarea
          className='mb-6 max-h-[13rem] w-full py-2'
          ref={textAreaRef}
          rows={1}
          value={value}
          onChange={(e) => handleChange(e, setValue)}
        />

        {/* 태그 영역 */}
        <div>
          <h4 className='mb-3 font-semibold'>태그</h4>
          {/* 태그 인풋 */}
          <div className='relative'>
            <input
              placeholder='태그를 입력해주세요'
              className='placeholder:text-grayscale-600 w-full bg-gray-50 py-2 pl-2 pr-[3.25rem] text-base font-medium'
              value={tagValue}
              onChange={(e) => handleChange(e, setTagValue)}
            />
            <button
              className='absolute right-3.5 top-2 h-6 w-6 rounded-full bg-gray-400 px-[0.2rem] py-[0.14rem]'
              onClick={handleAdd}
            >
              <Icon iconType='Plus' className='fill-gray-600' />
            </button>
          </div>

          {/* 태그 목록 */}
          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className='bg-grayscale-300 flex shrink-0 grow-0 basis-auto cursor-pointer items-center rounded-2xl px-2 py-1 text-sm text-black'
              >
                {tag}
                <Icon iconType='XMono' className='ml-1 h-[0.8rem] w-[0.8rem]' onClick={() => handleDelete(tag)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}
