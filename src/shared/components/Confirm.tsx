import { Fragment } from 'react';
import { Button } from '@/shared/components/Button';

export interface ConfirmProps {
  title: string;
  message: string;
  closeButtonLabel?: string;
  confirmButtonLabel?: string;
  close(): void;
  confirm(): void;
}

export function Confirm({
  title,
  message,
  closeButtonLabel = '취소',
  confirmButtonLabel = '확인',
  close,
  confirm,
}: ConfirmProps) {
  return (
    <Fragment>
      <div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-30' onClick={() => close()} />
      <div className='absolute left-1/2 top-1/2 flex w-[314px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-[23px] pb-[20px] pt-[44px]'>
        <strong className='mb-[16px] text-header1 text-grayscale-900'>{title}</strong>
        <p className='text-title3 text-grayscale-800'>{message}</p>
        <div className='mt-[28px] flex w-full gap-3'>
          <Button onClick={() => confirm()}>{confirmButtonLabel}</Button>
          <Button color='secondary' onClick={() => close()}>
            {closeButtonLabel}
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
