import Image from 'next/image';
import DefaultOGImage from '@/assets/images/og-image.png';
import { Tag } from '@/shared/components/Tag';

interface LinkItemProps {
  title: string;
  content: string;
  createdAt: Date;
}

export function LinkItem({ title, content, createdAt }: LinkItemProps) {
  return (
    <div className='w-full overflow-hidden rounded border border-grayscale-200 px-3 py-5'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-title3 text-black'>{title}</h2>
        <span className='text-body2 text-grayscale-500'>
          {new Date(createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </span>
        <div className='flex gap-2'>
          <Image className='h-auto' width={128} src={DefaultOGImage} alt='og-image' priority />
          <div className='line-clamp-3 h-fit w-full text-ellipsis break-all text-body2 text-grayscale-700'>
            {content}
          </div>
        </div>
      </div>
      <div className='mt-3 flex gap-2'>
        <Tag color='yellow'>태그에요 태그 열자에요</Tag>
        <Tag>+3</Tag>
      </div>
    </div>
  );
}
