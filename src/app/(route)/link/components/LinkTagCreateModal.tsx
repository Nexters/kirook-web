import { Fragment, MouseEventHandler, useState } from 'react';
import { Button } from '@/shared/components';
import { useModal } from '@/shared/components/modal/useModal';
import { cn } from '@/shared/utils/cn';
import { VariantProps, tv } from 'tailwind-variants'
import { Alert } from '@/shared/components/Alert';

const PALETTE_COLORS = ['gray', 'red', 'yellow', 'green', 'blue', 'purple', 'pink'] as const;
const MAX_TAG_LENGTH = 10;

export type PaletteColors = (typeof PALETTE_COLORS)[number];

interface LinkTagCreateModalProps {
  close(): void;
  onCreateTag(tagName: string, tagColor: PaletteColors): void;
}

export function LinkTagCreateModal({ close, onCreateTag }: LinkTagCreateModalProps) {
  const { openModal } = useModal();
  const [tagName, setTagName] = useState('');
  const [selectedTagColor, setSelectedTagColor] = useState<PaletteColors>();

  const changeTagNameInput = (value: string) => {
    if (value.length === MAX_TAG_LENGTH) {
      return;
    }

    setTagName(value);
  };

  const createTag = async () => {
    if (!tagName || !selectedTagColor) {
      await openModal((close) => (<Alert close={() => close(true)} message='태그 이름과 색상을 선택해주세요' />))
      return;
    }

    onCreateTag(tagName, selectedTagColor);
    close();
  };

  return (
    <Fragment>
      <div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-30' onClick={() => close()} />
      <div className='absolute left-1/2 top-1/2 flex w-[345px] -translate-x-1/2 -translate-y-1/2 flex-col items-start rounded-lg bg-white px-[20px] pb-[24px] pt-[28px]'>
        <label className='mb-3 text-title1 text-grayscale-900'>태그</label>
        <input
          className='w-full rounded bg-grayscale-100 px-3 py-2 text-title3 outline-none'
          placeholder='태그를 입력해주세요(최대 10자)'
          value={tagName}
          onChange={(e) => changeTagNameInput(e.target.value)}
        />
        <ul className='mt-4 flex w-full justify-around'>
          {PALETTE_COLORS.map((color) => (
            <Palette
              key={color}
              isSelected={color === selectedTagColor}
              color={color}
              onClick={() => setSelectedTagColor(color)}
            />
          ))}
        </ul>
        <div className='mt-[32px] flex w-full gap-3'>
          <Button onClick={() => close()}>취소</Button>
          <Button color='secondary' onClick={() => createTag()}>
            확인
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

const palette = tv({
  base: 'h-[24px] w-[35px] rounded-xl',
  variants: {
    color: {
      red: 'bg-tag-red',
      yellow: 'bg-tag-yellow',
      green: 'bg-tag-green',
      blue: 'bg-tag-blue',
      purple: 'bg-tag-purple',
      gray: 'bg-tag-gray',
      pink: 'bg-tag-pink',
    },
    isSelected: {
      true: 'border-2 border-grayscale-700 border-opacity-80',
    },
  },
  defaultVariants: {
    color: 'gray',
    isSelected: false,
  },
});

const PALETTE_COLORS_LABEL: Record<PaletteColors, string> = {
  red: '빨강',
  yellow: '노랑',
  green: '초록',
  blue: '파랑',
  purple: '보라',
  gray: '회색',
  pink: '분홍',
} as const;

interface PaletteBaseProps {
  onClick: MouseEventHandler<HTMLLIElement>;
}
type PaletteProps = PaletteBaseProps & VariantProps<typeof palette>;

function Palette({ isSelected, color, onClick }: PaletteProps) {
  return (
    <li className='flex flex-col items-center' onClick={onClick}>
      <div className={palette({ isSelected, color })} />
      <span
        className={cn('text-text font-medium text-grayscale-600', {
          'text-grayscale-800': isSelected,
        })}
      >
        {PALETTE_COLORS_LABEL[color as PaletteColors]}
      </span>
    </li>
  );
}
