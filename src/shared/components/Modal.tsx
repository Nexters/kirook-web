import { ReactNode } from 'react';
import { Portal } from './Portal';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  firstButton?: ReactNode;
  secondButton?: ReactNode;
  close(): void;
}

export function Modal({ isOpen, title, message, firstButton, secondButton, close }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Portal targetRoot='modal-root'>
      <div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-30' onClick={() => close()} />
      <div className='absolute left-1/2 top-1/2 z-10 flex w-[314px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-[23px] pb-[20px] pt-[44px]'>
        <strong className='mb-[16px] text-header1 text-grayscale-900'>{title}</strong>
        <p className='text-title3 text-grayscale-800'>{message}</p>
        <div className='mt-[28px] flex w-full gap-3'>
          {firstButton}
          {secondButton}
        </div>
      </div>
    </Portal>
  );
}
