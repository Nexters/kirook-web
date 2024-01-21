import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as icons from '@/assets/icons';
import { Icon } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

type IconType = keyof typeof icons;

const NavButton = ({
  path,
  label,
  icon,
  className,
}: {
  path: string;
  label: string;
  icon: IconType;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <div className='flex flex-col items-center gap-1 pb-8 pt-3.5'>
        <Icon iconType={icon} className={cn(isActive ? 'fill-black' : 'fill-grayscale-500', className)} />
        <div className='text-grayscale-700 text-xs'>{label}</div>
      </div>
    </Link>
  );
};

const Navigation = () => {
  return (
    <div className='border-grayscale-100 absolute bottom-0 flex h-fit w-full items-center justify-around border-t-4 bg-white'>
      <NavButton key='calendar' path='/calendar' label='캘린더' icon='Calendar' />
      <NavButton key='todo' path='/todo' label='투두' icon='Todo' className='px-0.5 pb-[3px] pt-1' />
      <NavButton key='memo' path='/memo' label='메모' icon='Memo' />
      <NavButton key='link' path='/link' label='링크' icon='Link' />
    </div>
  );
};

export default Navigation;
