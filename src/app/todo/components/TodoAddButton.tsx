import { type ButtonHTMLAttributes } from 'react';

interface TodoAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isInputActivated: boolean;
}

export function TodoAddButton({ isInputActivated, ...rest }: TodoAddButtonProps) {
  return (
    <button className='group flex items-center justify-center' type='button' {...rest}>
      {isInputActivated ? <XCircle /> : <Add />}
    </button>
  );
}

function Add() {
  return (
    <svg
      className='*:transition-all'
      width='24'
      height='23'
      viewBox='0 0 24 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 11.0873C0 4.36056 5.13803 0 12 0C18.862 0 24 4.36056 24 11.0873C24 17.8479 18.862 22.2084 12 22.2084C5.13803 22.2084 0 17.8817 0 11.0873Z'
        className='fill-grayscale-100 group-hover:fill-grayscale-700 group-focus:fill-grayscale-700'
      />
      <mask
        id='mask0_71_1955'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='3'
        y='2'
        width='18'
        height='18'
      >
        <rect x='3' y='2' width='18' height='18' fill='white' />
      </mask>
      <g mask='url(#mask0_71_1955)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.9886 10.1V4.84995C12.9886 4.61126 12.8938 4.38234 12.725 4.21356C12.5562 4.04477 12.3273 3.94995 12.0886 3.94995C11.8499 3.94995 11.621 4.04477 11.4522 4.21356C11.2834 4.38234 11.1886 4.61126 11.1886 4.84995V10.1H5.93857C5.69988 10.1 5.47096 10.1948 5.30218 10.3636C5.1334 10.5323 5.03857 10.7613 5.03857 11C5.03857 11.2386 5.1334 11.4676 5.30218 11.6363C5.47096 11.8051 5.69988 11.9 5.93857 11.9H11.1886V17.15C11.1886 17.3886 11.2834 17.6176 11.4522 17.7863C11.621 17.9551 11.8499 18.0499 12.0886 18.0499C12.3273 18.0499 12.5562 17.9551 12.725 17.7863C12.8938 17.6176 12.9886 17.3886 12.9886 17.15V11.9H18.2386C18.4773 11.9 18.7062 11.8051 18.875 11.6363C19.0438 11.4676 19.1386 11.2386 19.1386 11C19.1386 10.7613 19.0438 10.5323 18.875 10.3636C18.7062 10.1948 18.4773 10.1 18.2386 10.1H12.9886Z'
          className='fill-grayscale-400'
        />
      </g>
    </svg>
  );
}

function XCircle() {
  return (
    <svg
      className='*:transition-all'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 11.9831C0 5.25634 5.13803 0.895782 12 0.895782C18.862 0.895782 24 5.25634 24 11.9831C24 18.7437 18.862 23.1042 12 23.1042C5.13803 23.1042 0 18.7775 0 11.9831Z'
        className='fill-black group-hover:fill-grayscale-700 group-focus:fill-grayscale-700'
      />
      <mask
        id='mask0_50_446'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='3'
        y='2'
        width='18'
        height='19'
      >
        <rect x='3' y='2.89578' width='18' height='18' fill='white' />
      </mask>
      <g mask='url(#mask0_50_446)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.3614 11.8958L17.0737 8.18348C17.2425 8.01469 17.3373 7.78578 17.3373 7.54708C17.3373 7.30839 17.2425 7.07947 17.0737 6.91069C16.9049 6.7419 16.676 6.64708 16.4373 6.64708C16.1986 6.64708 15.9697 6.7419 15.8009 6.91069L12.0886 10.623L8.37631 6.91069C8.20753 6.7419 7.97861 6.64708 7.73992 6.64708C7.50122 6.64708 7.2723 6.7419 7.10352 6.91069C6.93474 7.07947 6.83992 7.30839 6.83992 7.54708C6.83992 7.78578 6.93474 8.01469 7.10352 8.18348L10.8158 11.8958L7.10352 15.6081C6.93474 15.7769 6.83992 16.0058 6.83992 16.2445C6.83992 16.4832 6.93474 16.7121 7.10352 16.8809C7.2723 17.0497 7.50122 17.1445 7.73992 17.1445C7.97861 17.1445 8.20753 17.0497 8.37631 16.8809L12.0886 13.1686L15.8009 16.8809C15.9697 17.0497 16.1986 17.1445 16.4373 17.1445C16.676 17.1445 16.9049 17.0497 17.0737 16.8809C17.2425 16.7121 17.3373 16.4832 17.3373 16.2445C17.3373 16.0058 17.2425 15.7769 17.0737 15.6081L13.3614 11.8958Z'
          className='fill-accent-500 group-hover:fill-grayscale-400 group-focus:fill-grayscale-400'
        />
      </g>
    </svg>
  );
}
