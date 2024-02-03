import { Memo } from '../../api/memos/[memoListId]/interface';
import { cn } from '@/shared/utils/cn';
import dayjs from 'dayjs';

interface MemoPreview extends Memo {
  className: string;
  onClick: () => void;
}

const MemoPreview = ({ title, createdAt, tags, className, onClick }: MemoPreview) => {
  const formattedDate = dayjs(createdAt).format('YYYY.MM.DD');

  return (
    <div
      className={cn('w-100 border-grayscale-200 flex flex-col gap-2.5 border-solid bg-white p-3.5', className)}
      onClick={onClick}
    >
      <h4 className='truncate font-bold'>{title}</h4>
      <p className='text-grayscale-500 text-xs'>{formattedDate}</p>
      <div className='no-scrollbar flex flex-nowrap justify-between gap-1 overflow-x-scroll'>
        {tags?.map((tag, idx) => (
          <div key={idx} className='bg-grayscale-300 shrink-0 grow-0 basis-auto rounded-2xl px-2 py-1 text-[0.625rem]'>
            {`#${tag.name}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoPreview;
