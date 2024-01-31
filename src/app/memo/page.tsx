'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MemoResponse, Memo, MultiSelectOption } from '../api/memos/[memoListId]/interface';
import MemoPreview from './components/MemoPreview';
import { MemoLogo } from '@/assets/logo';
import { Navigation } from '@/shared/components';
import { cn } from '@/shared/utils/cn';
import axios from 'axios';

const TAGS_MOCK_DATA = [
  {
    id: 'f196780c-0091-429d-8785-b88bbb2af870',
    name: '태그에요태그열자에요',
    color: 'gray',
  },
  {
    id: 'f196780c-0091-429d-8785',
    name: '태그3',
    color: 'gray',
  },
  {
    id: 'f196780c',
    name: '여행',
    color: 'gray',
  },
];

export default function Memo() {
  const filterMemoes = (tag: MultiSelectOption, memoes: Memo[]) => {
    if (tag.name === 'ALL') return memoes;
    return memoes.filter((memo: Memo) => memo.tags.includes(tag));
  };

  const [memos, setMemos]=useState<Memo[]>([])
  const [selectedTag, setSelectedTag] = useState<MultiSelectOption>({ name: 'ALL', id: 'all', color: 'gray'});
  const [selectedMemoes, setSelectedMemoes] = useState<Memo[]>(filterMemoes(selectedTag, memos));
  
  const fetchMemo = async (accessToken: string, memoListId: string) => {
    const res = await axios.get<MemoResponse>(`/api/memos/${memoListId}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(res.data.memos)

    return res.data.memos
  };

  const getMemos = async (accessToken: string, memoListId: string) => {
    const memos = await fetchMemo(accessToken, memoListId);
    setMemos(memos)
    setSelectedMemoes(filterMemoes(selectedTag, memos))
  }

  useEffect(() => {
    const memoListId = localStorage.getItem('memo');
    const accessToken = localStorage.getItem('accessToken');
    if (memoListId !== null && accessToken !== null) {
      getMemos(accessToken, memoListId);
    }
  }, []);

  console.log(selectedMemoes)

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
            {[{ name: 'ALL', id: 'all', color: 'gray'}, ...TAGS_MOCK_DATA].map((tag, idx) => (
              <div
                key={idx}
                className={cn(
                  'shrink-0 grow-0 basis-auto cursor-pointer rounded-2xl px-2 py-1 text-sm',
                  selectedTag.name === tag.name ? 'bg-black text-white' : 'bg-grayscale-300 text-black',
                )}
                onClick={() => {
                  setSelectedTag(tag);
                  setSelectedMemoes(filterMemoes(tag, memos));
                }}
              >
                {tag.name !== 'ALL' ? `#${tag.name}` : tag.name}
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
                    className={cn(
                      'border-grayscale-200',
                      idx===memos.length-1 ?  'rounded-lg border-[1px]' : ' rounded-t-lg border-x-[1px] border-t-[1px]')}
                    {...item}
                  />
                );
              }
              if (idx === memos.length - 1) {
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