'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { useCreateTodo } from '../queries/useCreateTodo';
import { TodoAddButton } from './TodoAddButton';
import { cn } from '@/shared/utils/cn';

export function TodoInput() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const { mutate: createTodo } = useCreateTodo(tab || 'today');
  const [input, setInput] = useState('');
  const [isInputActivated, setIsInputActivated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleTodoInput = () => {
    setIsInputActivated(!isInputActivated);

    if (isInputActivated) {
      inputRef.current?.blur();
      setInput('');
    } else {
      inputRef.current?.focus();
    }
  };

  const resetInput = () => {
    setIsInputActivated(false);
    setInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(input);
    setInput(e.target.value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo(input);
    resetInput();
  };

  return (
    <form className='flex w-full items-center gap-2 py-3' onSubmit={handleSubmit}>
      <TodoAddButton isInputActivated={isInputActivated} onClick={() => toggleTodoInput()} />
      <div className='relative flex w-full items-center gap-2'>
        <p
          className={cn('absolute left-0 text-title3 text-grayscale-600', {
            hidden: isInputActivated,
          })}
        >
          눌러서 추가하기
        </p>
        <div
          className={cn('flex w-full items-center gap-3', {
            'opacity-0': !isInputActivated,
          })}
        >
          <input
            ref={inputRef}
            type='text'
            value={input}
            onChange={handleInputChange}
            // onBlur={() => resetInput()}
            className='grow rounded-sm p-0.5 text-title3 caret-grayscale-600 outline-none transition-all duration-300 focus:bg-grayscale-100'
          />
          <button type='submit' className='w-fit text-body1 text-grayscale-700'>
            확인
          </button>
        </div>
      </div>
    </form>
  );
}
