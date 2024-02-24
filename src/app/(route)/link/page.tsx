'use client';

import { LinkInput } from './components/LinkInput';
import { Header } from '@/shared/components/layout/Header';
import { cn } from '@/shared/utils/cn';

export default function LinkPage() {
  return (
    <div className='flex h-full flex-col'>
      <Header logoText='Link' showBackButton />
      <div className='px-[15px] pb-[24px] pt-[12px]'>
        <LinkInput
          onSubmit={(link) => {
            console.log(link);
          }}
        />
        <div className='mt-[32px] flex items-center justify-between'>
          <strong className='text-grayscale text-black'>내 링크 목록</strong>
        </div>
      </div>
      <div className='flex grow flex-col items-center overflow-y-scroll bg-grayscale-50'>
        <p className='mt-[158px] text-title3 text-grayscale-700'>아직 스크랩한 링크가 없어요</p>
      </div>
    </div>
  );
}
