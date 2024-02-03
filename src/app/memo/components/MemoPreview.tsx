import { Memo } from '../../api/memos/[mmid]/interface';
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
      className={cn('w-100 flex flex-col gap-2.5 border-solid border-grayscale-200 bg-white p-3.5', className)}
      onClick={onClick}
    >
      <h4 className='truncate font-bold'>{title}</h4>
      <p className='text-xs text-grayscale-500'>{formattedDate}</p>
      <div className='no-scrollbar flex flex-nowrap justify-between gap-1 overflow-x-scroll'>
        {tags?.map((tag, idx) => (
          <div key={idx} className='shrink-0 grow-0 basis-auto rounded-2xl bg-grayscale-300 px-2 py-1 text-[0.625rem]'>
            {`#${tag.name}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoPreview;
