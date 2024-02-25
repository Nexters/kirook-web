import { Fragment } from 'react';
import { Button } from '@/shared/components/Button';

interface AlertProps {
  message: string;
  buttonLabel?: string;
  close(): void;
}

export function Alert({ message, buttonLabel = '확인', close }: AlertProps) {
  return (
    <Fragment>
      <div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-30' onClick={() => close()} />
      <div className='absolute left-1/2 top-1/2 z-10 flex w-[314px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-white px-[23px] pb-[20px] pt-[44px]'>
        {/* <strong className='mb-[16px] text-header1 text-grayscale-900'>{title}</strong> */}
        <p className='text-title3 text-grayscale-800'>{message}</p>
        <div className='mt-[28px] flex w-full gap-3'>
          <Button color='secondary' onClick={() => close()}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
