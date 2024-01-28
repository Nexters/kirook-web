'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Icon } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

export function TodoInput() {
  const [input, setInput] = useState('');
  const [isInputActivated, setIsInputActivated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: todo 추가하는 API 연동
  };

  const handleInputToggleButtonClick = () => {
    setIsInputActivated(!isInputActivated);

    if (isInputActivated) {
      inputRef.current?.blur();
      setInput('');
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <form className='flex w-full items-center gap-2 py-3' onSubmit={handleSubmit}>
      <button type='button' className='flex items-center justify-center' onClick={handleInputToggleButtonClick}>
        <Icon iconType={isInputActivated ? 'XCircle' : 'Add'} />
      </button>
      <div className='relative flex w-full items-center gap-2'>
        <p
          className={cn('text-body1 absolute left-0 text-grayscale-600', {
            hidden: isInputActivated,
          })}
        >
          눌러서 추가하기
        </p>
        <div
          className={cn('flex w-full items-center gap-2', {
            'opacity-0': !isInputActivated,
          })}
        >
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={handleInputChange}
            className='text-body2 grow py-[2.5px] caret-grayscale-600 outline-none transition-all duration-300 focus:shadow-input-focus'
          />
          <button type='submit' className='text-button w-fit text-grayscale-700'>
            확인
          </button>
        </div>
      </div>
    </form>
  );
}
