import Image from 'next/image';
import loadingFetch from '@/assets/images/loading-fetch.png';
import loadingSave from '@/assets/images/loading-save.png';

interface LoadingProps {
  type: 'fetching' | 'saving';
}

export function Loading({ type }: LoadingProps) {
  return (
    <div className='z-100 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white'>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3'>
        <Image
          src={type === 'fetching' ? loadingFetch : loadingSave}
          alt='loading view'
          quality={100}
          priority
          width={type === 'fetching' ? 80 : 162}
        />
        <span className='text-title1 text-black'>{type === 'fetching' ? '불러오는 중' : '저장중'}</span>
      </div>
    </div>
  );
}
