'use client';

import Image from 'next/image';
import { Button } from '@/shared/components';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html className='h-full w-full'>
      <body className='h-full w-full'>
        <div className='flex h-full items-center justify-center'>
          <div className='flex flex-col items-center gap-6'>
            <Image src='/not-found.png' alt='not found icon' width={36} height={32} priority />
            <strong className='text-title3 text-grayscale-900'>오류가 발생했습니다</strong>
            <Button onClick={() => reset()}>다시 시도해보기</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
