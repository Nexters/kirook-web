import Image from 'next/image';
import { useState } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';
import { LinkTagCreateModal, type PaletteColors } from './LinkTagCreateModal';
import { LinkPreviewResponse } from '@/app/api/links/scraping/route';
import DefaultOGImage from '@/assets/images/og-image.png';
import { Icon } from '@/shared/components';
import { Tag } from '@/shared/components/Tag';
import { toKRDateString } from '@/shared/utils/date';
import { v4 as uuidv4 } from 'uuid';

interface TagType {
  id: string;
  name: string;
  color: PaletteColors;
}
export interface FormValues extends LinkPreviewResponse {
  link?: string;
}
interface LinkCreateFormProps {
  initialFormValue: FormValues;
}

export function LinkCreateForm({ initialFormValue }: LinkCreateFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState<Array<TagType>>([]);
  const { title, description, image, link } = initialFormValue;

  const addTag = (tagName: string, tagColor: PaletteColors) => {
    setTags((prev) => [...prev, { id: uuidv4(), name: tagName, color: tagColor }]);
  };

  const removeTag = (id: string) => {
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  };

  return (
    <form className='absolute left-0 top-0 h-full w-full overflow-y-scroll bg-white px-[15px] pt-5'>
      <span className='text-body2 text-grayscale-700 '>{toKRDateString(new Date())}</span>
      <p className='my-3 overflow-hidden text-ellipsis whitespace-nowrap text-text text-grayscale-600'>{link}</p>
      <div className='relative h-[182px] w-full overflow-hidden'>
        <Image
          src={image || DefaultOGImage}
          className='rounded object-cover'
          alt='og-image'
          fill
          priority
          quality={100}
        />
      </div>
      <div className='mt-[28px] flex flex-col gap-5 *:flex *:flex-col [&_label]:text-title1'>
        <div>
          <label>제목</label>
          <Input text={title || ''} onChange={() => {}} />
        </div>
        <div>
          <label>내용</label>
          <Input text={description || ''} onChange={() => {}} />
        </div>
        <div>
          <label>태그</label>
          <div
            className='flex cursor-pointer items-center justify-between rounded bg-grayscale-100 px-[13px] py-2 text-title3'
            onClick={() => setIsModalOpen(true)}
          >
            <input
              className='bg-transparent text-grayscale-600 outline-none'
              placeholder='태그를 입력해주세요'
              readOnly
            />
            <button type='button'>
              <Add />
            </button>
          </div>
          <div className='mt-3 flex flex-wrap gap-2 py-2'>
            {tags.map((tag) => (
              <Tag key={tag.id} color={tag.color}>
                {tag.name}
                <button type='button' onClick={() => removeTag(tag.id)}>
                  <Icon iconType='XMono' width={14} height={14} />
                </button>
              </Tag>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <LinkTagCreateModal
            isOpen={isModalOpen}
            close={() => setIsModalOpen(false)}
            onCreateTag={(tagName, tagColor) => addTag(tagName, tagColor)}
          />
        )}
      </div>
    </form>
  );
}

interface InputProps {
  text: string;
  onChange: (e: ContentEditableEvent) => void;
}

function Input({ text, onChange }: InputProps) {
  return (
    <ContentEditable
      className='rounded bg-grayscale-50 py-2 text-title3 text-grayscale-900 outline-none'
      html={text}
      onChange={onChange}
    />
  );
}

function Add() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 12.0873C0 5.36056 5.13803 1 12 1C18.862 1 24 5.36056 24 12.0873C24 18.8479 18.862 23.2084 12 23.2084C5.13803 23.2084 0 18.8817 0 12.0873Z'
        fill='#CDCED6'
      />
      <mask
        id='mask0_390_4058'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='3'
        y='3'
        width='18'
        height='18'
      >
        <rect x='3' y='3' width='18' height='18' fill='white' />
      </mask>
      <g mask='url(#mask0_390_4058)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.9886 11.1V5.84995C12.9886 5.61126 12.8938 5.38234 12.725 5.21356C12.5562 5.04477 12.3273 4.94995 12.0886 4.94995C11.8499 4.94995 11.621 5.04477 11.4522 5.21356C11.2834 5.38234 11.1886 5.61126 11.1886 5.84995V11.1H5.93857C5.69988 11.1 5.47096 11.1948 5.30218 11.3636C5.1334 11.5323 5.03857 11.7613 5.03857 12C5.03857 12.2386 5.1334 12.4676 5.30218 12.6363C5.47096 12.8051 5.69988 12.9 5.93857 12.9H11.1886V18.15C11.1886 18.3886 11.2834 18.6176 11.4522 18.7863C11.621 18.9551 11.8499 19.0499 12.0886 19.0499C12.3273 19.0499 12.5562 18.9551 12.725 18.7863C12.8938 18.6176 12.9886 18.3886 12.9886 18.15V12.9H18.2386C18.4773 12.9 18.7062 12.8051 18.875 12.6363C19.0438 12.4676 19.1386 12.2386 19.1386 12C19.1386 11.7613 19.0438 11.5323 18.875 11.3636C18.7062 11.1948 18.4773 11.1 18.2386 11.1H12.9886Z'
          fill='#858899'
        />
      </g>
    </svg>
  );
}
