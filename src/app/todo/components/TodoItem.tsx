'use client';

import { FormEvent, useCallback, useRef, useState } from 'react';
import React from 'react';
import { Icon } from '@/shared/components';

interface TodoItemProps {
  id: string;
  isFullfilled: boolean;
  content: string;
}

export function TodoItem({ id, isFullfilled, content }: TodoItemProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const previousContent = useRef(content);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickToggle = () => {
    // TODO: API 호출
    // toggle에 API 호출 너무 자주 일어날려나? API 기다려야하나?
  };

  const handleClickButton = useCallback(() => {
    if (isEditMode) {
      const inputValue = inputRef.current?.value;
      if (inputValue?.length === 0) return;

      // TODO: 수정 로직

      setIsEditMode(false);
      return;
    }

    // TODO: 삭제 로직
  }, [isEditMode]);

  const resetInput = useCallback(() => {
    if (!isEditMode) return;
    if (!inputRef.current) return;

    inputRef.current.value = previousContent.current;
    setIsEditMode(false);
  }, [isEditMode]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditMode) return;
  }, []);

  return (
    <form className='flex w-full items-start gap-2 py-3' onSubmit={handleSubmit}>
      <button type='button' className='flex items-center justify-center' onClick={handleClickToggle}>
        <Icon iconType={isFullfilled ? 'CheckFilled' : 'Check'} />
      </button>
      <input
        ref={inputRef}
        className='h-auto grow resize-none overflow-hidden bg-transparent text-body2 leading-[24px] outline-none transition-colors duration-300 focus:bg-grayscale-50'
        defaultValue={content}
        onFocus={() => setIsEditMode(true)}
        onBlur={resetInput}
      />
      <button type='button' className='w-fit shrink-0 text-button text-grayscale-700' onClick={handleClickButton}>
        {isEditMode ? '확인' : '삭제'}
      </button>
    </form>
  );
}
