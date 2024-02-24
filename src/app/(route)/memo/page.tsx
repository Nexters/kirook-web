'use client';

import { useEffect, useState } from 'react';
import {Memo, MultiSelectOption } from '../../api/memos/[memoListId]/interface';
import MemoPreview from './components/MemoPreview';
import { cn } from '@/shared/utils/cn';
import useStore from './hooks/useStore';
import { useRouter } from 'next/navigation';
import { MemoAddButton } from './components/MemoAddButton';
import { Header } from '@/shared/components/layout/Header';

export default function Memo() {
  const router = useRouter();
  const filterMemoes = (tag: MultiSelectOption, memoes: Memo[]) => {
    if (tag.name === 'ALL') return memoes;
    return memoes.filter((memo: Memo) => memo.tags.map((item)=>item.name === tag.name).some(Boolean)
    );
  };

  const { memos, tags, isLoading, fetchMemoes, fetchTags } = useStore((state)=>state)
  const [selectedTag, setSelectedTag] = useState<MultiSelectOption>({ name: 'ALL', id: 'all', color: 'gray'});
  const [selectedMemoes, setSelectedMemoes] = useState<Memo[]>(filterMemoes(selectedTag, memos));

  const handleClick = (memoId : string) => {
    router.push(`/memo/write/${memoId}`)
  }

  useEffect(() => {
    const memoListId = localStorage.getItem('memo');
    const accessToken = localStorage.getItem('accessToken');
    if (memoListId !== null && accessToken !== null) {
      fetchMemoes(accessToken, memoListId);
      fetchTags(accessToken, memoListId)
    }
  }, [fetchMemoes, fetchTags]);

  useEffect(()=>{
    setSelectedMemoes(filterMemoes(selectedTag, memos))
  },[memos, selectedTag])

  return (
      <div className='bg-grayscale-50 flex h-screen w-full flex-col'>
        <div className='bg-white'>
        <Header logoText='Memo' showBackButton />

          {/* MEMO 태그 필터 */}
          <div className='no-scrollbar ml-4 flex flex-nowrap gap-2 overflow-x-scroll py-2'>
            {[{ name: 'ALL', id: 'all', color: 'gray'}, ...tags].map((tag, idx) => (
              <div
                key={idx}
                className={cn(
                  'shrink-0 grow-0 basis-auto cursor-pointer rounded-2xl px-2 py-1 text-sm',
                  selectedTag.name === tag.name ? 'bg-black text-white' : `bg-tag-${tag.color} text-black`,
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
        { isLoading ? 
          // NOTE: 로딩뷰 필요
          ( <div>Loading...</div>) : (<>
            {
              selectedMemoes.length > 0 ? (
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
                    onClick={()=>handleClick(item.id)}
                  />
                );
              }
              if (idx === memos.length - 1) {
                return <MemoPreview key={idx} className='border-grayscale-200 rounded-b-lg border-[1px]' {...item} onClick={()=>handleClick(item.id)}/>;
              }
              return <MemoPreview key={idx} className='border-grayscale-200 border-x-[1px] border-t-[1px]' {...item} onClick={()=>handleClick(item.id)}/>;
            })}
          </div>
        </div>
              ): (
                <div className="h-full flex justify-center items-center text-grayscale-700 text-title3">아직 작성한 메모가 없어요</div>)
            }
          </> 
        )}
        <MemoAddButton 
          onClick={()=>router.push('/memo/write')} 
          className="absolute bottom-[7rem] right-[1rem] flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-black shadow-lg shadow-grayscale-500"/>
      </div>
  );
}