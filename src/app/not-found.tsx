import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex flex-col items-center gap-6'>
        <Image src='/not-found.png' alt='not found icon' width={36} height={32} priority />
        <strong className='text-title3 text-grayscale-900'>원하시는 페이지를 찾을 수 없습니다</strong>
      </div>
    </div>
  );
}
