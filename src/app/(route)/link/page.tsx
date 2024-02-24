'use client';

import { LinkCreateForm } from './components/LinkCreateForm';
import { LinkInput } from './components/LinkInput';
import { LinkItem } from './components/LinkItem';
import { TagFilter } from '@/shared/components/TagFilter';
import { Header } from '@/shared/components/layout/Header';

export default function LinkPage() {
  return (
    <div className='flex h-full flex-col'>
      <Header logoText='Link' showBackButton />
      <div className='relative flex h-full flex-col'>
        <div className='px-[15px] pb-[12px] pt-[12px]'>
          <LinkInput
            onSubmit={(link) => {
              console.log(link);
            }}
          />
          <div className='mt-[32px] flex items-center justify-between'>
            <strong className='text-grayscale text-black'>내 링크 목록</strong>
          </div>
          <div className='no-scrollbar flex gap-2 overflow-hidden overflow-x-scroll py-2'>
            <TagFilter color='red' isSelected onClick={() => {}}>
              tag filter
            </TagFilter>
            <TagFilter color='yellow' onClick={() => {}}>
              tag filter
            </TagFilter>
            <TagFilter color='green' onClick={() => {}}>
              tag filter
            </TagFilter>
            <TagFilter color='blue' onClick={() => {}}>
              tag filter
            </TagFilter>
            <TagFilter color='purple' onClick={() => {}}>
              tag filter
            </TagFilter>
          </div>
          <div className='mt-[20px] flex justify-between'>
            <span className='text-body2 text-grayscale-600'>n개의 링크</span>
            <button className='text-body1 text-grayscale-900' type='button'>
              편집하기
            </button>
          </div>
        </div>
        <LinkItem
          title='title'
          createdAt={new Date()}
          content='sdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsldsdjskdjlsdjlsjdlsjdljsldjsld'
        />
        <div className='flex grow flex-col items-center overflow-y-scroll bg-grayscale-50'>
          <p className='mt-[158px] text-title3 text-grayscale-700'>아직 스크랩한 링크가 없어요</p>
        </div>
        {/* <LinkCreateForm /> */}
      </div>
    </div>
  );
}
