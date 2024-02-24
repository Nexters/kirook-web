import { ButtonHTMLAttributes } from 'react';
import { Icon } from '@/shared/components';

export function MemoAddButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={props.className} {...props}>
      <Icon iconType='Plus' className='ml-[0.3rem] mt-[0.2rem] h-[1.5rem] w-[1.5rem] fill-white' />
    </button>
  );
}
