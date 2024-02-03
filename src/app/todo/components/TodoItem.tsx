'use client';

import { type FocusEvent, type FormEvent, useCallback, useRef, useState } from 'react';
import { TodoContentEditableText } from './TodoContentEditableText';
import { useDeleteTodo } from '@/app/todo/queries/useDeleteTodo';
import { Button, CheckBox, Modal } from '@/shared/components';

interface TodoItemProps {
  id: string;
  isFullfilled: boolean;
  content: string;
}

export function TodoItem({ id, isFullfilled, content }: TodoItemProps) {
  const { mutate: deleteTodo } = useDeleteTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const textRef = useRef(content);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleCheck = () => {
    // TODO: API 호출
  };

  const resetInput = useCallback(() => {
    textRef.current = content;
    setIsEditMode(false);
  }, [content]);

  const handleBlurText = (e: FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget === buttonRef.current) return;
    resetInput();
  };

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isEditMode) {
        const input = textRef.current;
        if (input.length === 0) return;

        // TODO: 수정 로직
        setIsEditMode(false);
      } else {
        openModal();
      }
    },
    [isEditMode, openModal],
  );

  return (
    <form className='flex w-full items-start gap-2 py-3' onSubmit={handleSubmit}>
      <CheckBox isChecked={isFullfilled} onClick={() => toggleCheck()} className='shrink-0' />
      <TodoContentEditableText textRef={textRef} onFocus={() => setIsEditMode(true)} onBlur={handleBlurText} />
      <button ref={buttonRef} type='submit' className='w-fit shrink-0 text-body1 text-grayscale-700'>
        {isEditMode ? '확인' : '삭제'}
      </button>
      {
        <Modal
          isOpen={isModalOpen}
          title='삭제하실건가요?'
          message='삭제한 내용은 되돌릴 수 없어요'
          firstButton={<Button onClick={() => deleteTodo(id)}>확인</Button>}
          secondButton={
            <Button color='secondary' onClick={() => closeModal()}>
              취소
            </Button>
          }
          close={() => closeModal()}
        />
      }
    </form>
  );
}
