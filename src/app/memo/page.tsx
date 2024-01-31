'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import MemoPreview from './components/MemoPreview';
import { MemoLogo } from '@/assets/logo';
import { Navigation } from '@/shared/components';
import { cn } from '@/shared/utils/cn';
import axios from 'axios';

interface memoProps {
  title: string;
  updatedAt: Date;
  // TODO: tag 정보 어떻게 넘어오는지 확인 이후 변경 예정
  tags: string[];
}

const MEMO_MOCK_DATA = [
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date(),
    tags: ['태그에요태그열자에요', '태그에요태그열자에요', '태그에요태그열자에요', '태그에요태그열자에요'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['태그에요태그열자에요', '태그에요태그열자에요', '태그에요태그열자에요', '태그에요태그열자에요'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['태그3'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['태그3'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['태그3'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['TAG태그8'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['TAG태그8'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['TAG태그8'],
  },
  {
    title: '제목첫줄만 제목제목 넘어가면 말줄임 처리해요 제목 첫줄만 ',
    updatedAt: new Date('2024.05.31'),
    tags: ['TAG태그8'],
  },
];

const TAGS_MOCK_DATA = ['태그에요태그열자에요', '태그3', 'TAG태그8'];

export default function Memo() {
  const filterMemoes = (tag: string, memoes: memoProps[]) => {
    if (tag === 'ALL') return memoes;
    return memoes.filter((memo: memoProps) => memo.tags.includes(tag));
  };

  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedMemoes, setSelectedMemoes] = useState(filterMemoes(selectedTag, MEMO_MOCK_DATA));
  const fetchMemo = async (accessToken: string, memolistId: string) => {
    const res = await axios.get(`/api/memos/${memolistId}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    console.log(res.data);
  };

  useEffect(() => {
    const memoListId = localStorage.getItem('memo');
    const accessToken = localStorage.getItem('accessToken');
    if (memoListId !== null && accessToken !== null) {
      fetchMemo(accessToken, memoListId);
    }
  }, []);
  return (
    <>
      <div className='bg-grayscale-50 flex h-screen w-full flex-col'>
        <div className='bg-white'>
          {/* MEMO 로고 */}
          <div className='mb-5 mt-[11px] flex justify-center'>
            <Image src={MemoLogo} alt='memoTab_logoImage' />
          </div>

          {/* MEMO 태그 필터 */}
          <div className='no-scrollbar ml-4 flex flex-nowrap gap-2 overflow-x-scroll py-2'>
            {['ALL', ...TAGS_MOCK_DATA].map((tag, idx) => (
              <div
                key={idx}
                className={cn(
                  'shrink-0 grow-0 basis-auto cursor-pointer rounded-2xl px-2 py-1 text-sm',
                  selectedTag === tag ? 'bg-black text-white' : 'bg-grayscale-300 text-black',
                )}
                onClick={() => {
                  setSelectedTag(tag);
                  setSelectedMemoes(filterMemoes(tag, MEMO_MOCK_DATA));
                }}
              >
                {tag !== 'ALL' ? `#${tag}` : tag}
              </div>
            ))}
          </div>

          {/* 메모 총 개수 */}
          <div className='text-grayscale-700 ml-4 py-2 text-[0.625rem]'>{selectedMemoes.length}개의 메모</div>
        </div>

        {/* Memo List 영역 */}
        <div className='mb-[94px] h-[calc(100vh-13rem)] grow px-[15px] py-3'>
          <div className='no-scrollbar h-full overflow-y-scroll'>
            {selectedMemoes.map((item, idx) => {
              if (idx === 0) {
                return (
                  <MemoPreview
                    key={idx}
                    className='border-grayscale-200 rounded-t-lg border-x-[1px] border-t-[1px]'
                    {...item}
                  />
                );
              }
              if (idx === MEMO_MOCK_DATA.length - 1) {
                return <MemoPreview key={idx} className='border-grayscale-200 rounded-b-lg border-[1px]' {...item} />;
              }
              return <MemoPreview key={idx} className='border-grayscale-200 border-x-[1px] border-t-[1px]' {...item} />;
            })}
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}
