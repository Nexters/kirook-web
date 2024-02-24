import { useEffect, useRef, useState } from 'react';
import useAutosizeTextArea from '../hooks/useAutosizeTextArea';
import TagColorDropdown from './TagColorDropdown';
import { MultiSelectOption } from '@/app/api/memos/[memoListId]/interface';
import { Icon } from '@/shared/components';

interface MemoItemProps {
  date: string;
  value: string;
  tagValue: string;
  tags: MultiSelectOption[];
  onTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTagChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAdd?: (color: string) => void;
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>('gray');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  const onClickAdd = () => {
    handleAdd?.(color);
    setColor('gray');
  };

  useEffect(() => {
    const handleOutsideClose = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!dropdownRef?.current) return;
      if (isOpen && !dropdownRef.current.contains(target)) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen, dropdownRef]);

  return (
    <>
      {/* 오늘 날짜 */}
      <div className='text-grayscale-700 py-2 text-[0.625rem]'>{date}</div>

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
            className='placeholder:text-grayscale-600 w-full bg-gray-50 py-2 pl-2 pr-[3.25rem] text-base font-medium'
            value={tagValue}
            onChange={onTagChange}
          />
          <button
            className={`bg-tag-${color} border-grayscale-500 absolute right-11 top-2 h-6 w-6 rounded-full px-[0.2rem] py-[0.14rem]`}
            onClick={() => setIsOpen(true)}
          />
          <button
            className='absolute right-3.5 top-2 h-6 w-6 rounded-full bg-gray-400 px-[0.2rem] py-[0.14rem]'
            onClick={onClickAdd}
          >
            <Icon iconType='Plus' className='fill-gray-600' />
          </button>

          {isOpen && (
            <TagColorDropdown
              color={color}
              setColor={setColor}
              className='absolute right-4 top-9'
              setIsOpen={setIsOpen}
              ref={dropdownRef}
            />
          )}
        </div>

        {/* 태그 목록 */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className={`bg-tag-${tag.color} flex shrink-0 grow-0 basis-auto cursor-pointer items-center rounded-2xl px-2 py-1 text-sm text-black`}
            >
              {tag.name}
              <Icon
                iconType='XMono'
                className='ml-1 h-[0.8rem] w-[0.8rem]'
                {...(handleDelete && { onClick: () => handleDelete(tag.name) })}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MemoItem;
