import { Icon } from '@/shared/components';

export function TodoItem() {
  return (
    <div className='flex w-full items-start gap-2 py-3'>
      <button type='button' className='flex items-center justify-center'>
        <Icon iconType='CheckFilled' />
      </button>
      <p contentEditable className='grow text-sm font-normal'>
        투두 본문 텍스트를 입력해요 투두 본문 텍스트를 입력해요 투두 본문 텍스트를 입력해요 투두 본문 텍스트를 입력해요
      </p>
      <button type='button' className='text-grayscale-700 w-fit shrink-0 font-bold'>
        삭제
      </button>
    </div>
  );
}
