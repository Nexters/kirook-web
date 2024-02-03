import { cn } from '@/shared/utils/cn';

interface TodoTabLabelProps {
  label: string;
  todoCount?: number;
  isActive: boolean;
}

export function TodoTabLabel({ label, todoCount, isActive }: TodoTabLabelProps) {
  return (
    <div className='flex items-center gap-[5px]'>
      <span className='text-header1'>{label}</span>
      {todoCount && (
        <div
          className={cn('rounded-[20px] bg-black px-[6px] py-[2px] text-body1 text-[#8EFF67]', {
            'bg-grayscale-600 text-white': !isActive,
          })}
        >
          {todoCount}
        </div>
      )}
    </div>
  );
}
