import { useRef } from 'react';
import useAutosizeTextArea from '../hooks/useAutosizeTextArea';
import { Icon } from '@/shared/components';

interface MemoItemProps {
  date: string;
  value: string;
  tagValue: string;
  tags: string[];
  onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAdd?: () => void;
  handleDelete?: (tag: string) => void;
}

const MemoItem = ({
  date,
  value,
  tagValue,
  tags,
  onTextChange,
  onTagChange,
  handleAdd,
  handleDelete,
}: MemoItemProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      {/* 오늘 날짜 */}
      <div className='py-2 text-[0.625rem] text-grayscale-700'>{date}</div>

      {/* 텍스트 인풋 영역 */}
      <textarea
        className='mb-6 max-h-[13rem] w-full py-2'
        ref={textAreaRef}
        rows={1}
        value={value}
        onChange={onTextChange}
      />

      {/* 태그 영역 */}
      <div>
        <h4 className='mb-3 font-semibold'>태그</h4>
        {/* 태그 인풋 */}
        <div className='relative'>
          <input
            placeholder='태그를 입력해주세요'
            className='w-full bg-gray-50 py-2 pl-2 pr-[3.25rem] text-base font-medium placeholder:text-grayscale-600'
            value={tagValue}
            onChange={onTagChange}
          />
          <button
            className='absolute right-3.5 top-2 h-6 w-6 rounded-full bg-gray-400 px-[0.2rem] py-[0.14rem]'
            onClick={handleAdd}
          >
            <Icon iconType='Plus' className='fill-gray-600' />
          </button>
        </div>

        {/* 태그 목록 */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className='flex shrink-0 grow-0 basis-auto cursor-pointer items-center rounded-2xl bg-grayscale-300 px-2 py-1 text-sm text-black'
            >
              {tag}
              <Icon
                iconType='XMono'
                className='ml-1 h-[0.8rem] w-[0.8rem]'
                {...(handleDelete && { onClick: () => handleDelete(tag) })}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MemoItem;
