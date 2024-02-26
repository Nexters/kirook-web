'use client';

import { type FormEvent, type MutableRefObject, useState } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';
import { cn } from '@/shared/utils/cn';

const PLACEHOLDER = '링크 입력하기';
interface LinkInputProps {
  textRef: MutableRefObject<string>;
  onSubmit(link: string): void;
}

export function LinkInput({ textRef, onSubmit }: LinkInputProps) {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e: ContentEditableEvent) => {
    textRef.current = e.target.value;
    if (textRef.current.length === 0) {
      setIsActive(false);
      return;
    }

    setIsActive(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(textRef.current);
    setIsActive(false);
  };

  return (
    <form className='relative flex items-start gap-4 rounded bg-grayscale-50 p-[13px]' onSubmit={handleSubmit}>
      <ContentEditable
        className='w-full overflow-hidden break-words text-title3 text-grayscale-600 outline-none'
        html={textRef.current}
        onChange={handleChange}
      />
      {/* ContentEditable이 placeholder를 제공하지 않기 때문에 Hacky한 방법으로 처리 */}
      {textRef.current.length === 0 && (
        <p
          className={cn('absolute left-[13px] top-1/2 -translate-y-1/2 text-title1 text-grayscale-600', {
            // hidden: textRef.current.length > 0,
          })}
        >
          {PLACEHOLDER}
        </p>
      )}
      <button className='flex shrink-0' type='submit'>
        {isActive ? <AddActive /> : <Add />}
      </button>
    </form>
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

function AddActive() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 12.0873C0 5.36056 5.13803 1 12 1C18.862 1 24 5.36056 24 12.0873C24 18.8479 18.862 23.2084 12 23.2084C5.13803 23.2084 0 18.8817 0 12.0873Z'
        fill='black'
      />
      <mask
        id='mask0_390_4094'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='3'
        y='3'
        width='18'
        height='18'
      >
        <rect x='3' y='3' width='18' height='18' fill='white' />
      </mask>
      <g mask='url(#mask0_390_4094)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.9886 11.1V5.84995C12.9886 5.61126 12.8938 5.38234 12.725 5.21356C12.5562 5.04477 12.3273 4.94995 12.0886 4.94995C11.8499 4.94995 11.621 5.04477 11.4522 5.21356C11.2834 5.38234 11.1886 5.61126 11.1886 5.84995V11.1H5.93857C5.69988 11.1 5.47096 11.1948 5.30218 11.3636C5.1334 11.5323 5.03857 11.7613 5.03857 12C5.03857 12.2386 5.1334 12.4676 5.30218 12.6363C5.47096 12.8051 5.69988 12.9 5.93857 12.9H11.1886V18.15C11.1886 18.3886 11.2834 18.6176 11.4522 18.7863C11.621 18.9551 11.8499 19.0499 12.0886 19.0499C12.3273 19.0499 12.5562 18.9551 12.725 18.7863C12.8938 18.6176 12.9886 18.3886 12.9886 18.15V12.9H18.2386C18.4773 12.9 18.7062 12.8051 18.875 12.6363C19.0438 12.4676 19.1386 12.2386 19.1386 12C19.1386 11.7613 19.0438 11.5323 18.875 11.3636C18.7062 11.1948 18.4773 11.1 18.2386 11.1H12.9886Z'
          fill='white'
        />
      </g>
    </svg>
  );
}
