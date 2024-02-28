import Image from 'next/image';
import Link from 'next/link';
import { PaletteColors } from './LinkTagCreateModal';
import { MultiSelect } from '@/app/api/links/interface';
import DefaultOGImage from '@/assets/images/og-image.png';
import { CheckBox } from '@/shared/components';
import { Tag } from '@/shared/components/Tag';
import { cn } from '@/shared/utils/cn';

interface LinkBoxProps {
  isSelected?: boolean;
  isEditMode: boolean;
  title: string;
  content: string;
  createdAt: string;
  imageSrc?: string;
  link: string;
  tags?: MultiSelect[];
  selectLink(): void;
}

export function LinkBox({
  isSelected = false,
  isEditMode,
  title,
  content,
  createdAt,
  imageSrc,
  tags,
  link,
  selectLink,
}: LinkBoxProps) {
  return (
    <div
      className={cn('w-full flex-shrink-0 overflow-hidden rounded border border-grayscale-200 bg-white px-3 py-5', {
        'bg-grayscale-200': isSelected,
      })}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex w-full items-center justify-between gap-2'>
          <Link href={link} passHref target='_blank'>
            <h2 className='grow truncate text-title3 text-black'>{title}</h2>
          </Link>
          {isEditMode && (
            <button type='button' onClick={() => selectLink()}>
              <CheckBox isChecked={isSelected} className='shrink-0' />
            </button>
          )}
        </div>
        <span className='text-body2 text-grayscale-500'>
          {new Date(createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
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
