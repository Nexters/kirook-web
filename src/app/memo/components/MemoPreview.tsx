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
      className={cn('w-100 flex flex-col gap-2.5 border-solid border-grayscale-200 bg-white p-3.5', className)}
      onClick={onClick}
    >
      <h4 className='truncate font-bold'>{title}</h4>
      <p className='text-xs text-grayscale-500'>{formattedDate}</p>
      <div className='flex flex-nowrap gap-1'>
        {tags.length > 0 && (
          <>
            <div className='shrink-0 grow-0 basis-auto rounded-lg bg-grayscale-300 px-2 py-1 text-[0.625rem]'>
              {`#${tags[0].name}`}
            </div>
            {tags.length > 1 && (
              <div className='shrink-0 grow-0 basis-auto rounded-xl bg-grayscale-100 px-2 py-1 text-[0.625rem]'>
                {`+${tags.length - 1}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemoPreview;
