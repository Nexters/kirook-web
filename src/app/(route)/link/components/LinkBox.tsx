import Image from 'next/image';
import { PaletteColors } from './LinkTagCreateModal';
import { MultiSelect } from '@/app/api/links/interface';
import DefaultOGImage from '@/assets/images/og-image.png';
import { Tag } from '@/shared/components/Tag';

interface LinkBoxProps {
  title: string;
  content: string;
  createdAt: string;
  imageSrc?: string;
  link?: string;
  tags?: MultiSelect[];
}

export function LinkBox({ title, content, createdAt, imageSrc, link, tags }: LinkBoxProps) {
  return (
    <div className='w-full flex-shrink-0 overflow-hidden rounded border border-grayscale-200 bg-white px-3 py-5'>
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
          <div className='relative h-[66px] w-[128px] flex-shrink-0 overflow-hidden rounded'>
            <Image
              className='h-auto w-auto object-cover'
              fill
              src={imageSrc || DefaultOGImage}
              alt='og-image'
              priority
            />
          </div>
          <div className='line-clamp-3 h-fit w-full text-ellipsis break-all text-body2 text-grayscale-700'>
            {content}
          </div>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className='mt-3 flex gap-2'>
          <Tag color={tags[0].color as PaletteColors}>{tags[0].name}</Tag>
          {tags.length > 1 && <Tag>{`+${tags.length - 1}`}</Tag>}
        </div>
      )}
    </div>
  );
}
