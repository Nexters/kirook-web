'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { createTodo } from '../apis/todo';
import { Icon } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

export function TodoInput() {
  const [input, setInput] = useState('');
  const [isInputActivated, setIsInputActivated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: todo 추가하는 API 연동
    const accessToken = localStorage.getItem('accessToken') || '';
    const dbId = localStorage.getItem('todo') || '';
    const res = await createTodo(dbId, accessToken, input);

    alert(res);
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
          className={cn('text-body1 text-grayscale-600 absolute left-0', {
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
            className='text-body2 caret-grayscale-600 focus:shadow-input-focus grow py-[2.5px] outline-none transition-all duration-300'
          />
          <button type='submit' className='text-button text-grayscale-700 w-fit'>
            확인
          </button>
        </div>
      </div>
    </form>
  );
}
