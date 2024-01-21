import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as icons from '@/assets/icons';
import { Icon } from '@/shared/components';

type IconType = keyof typeof icons;

const NavButton = ({ path, label, icon }: { path: string; label: string; icon: IconType }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <div className='flex flex-col justify-center px-8 pb-8 pt-3.5'>
        <Icon iconType={icon} className={isActive ? 'fill-black' : 'fill-grayscale-500'} />
        <div className='text-grayscale-700 text-xs'>{label}</div>
      </div>
    </Link>
  );
};

const Navigation = () => {
  return (
    <div className='w-100 fixed bottom-0 flex h-fit items-center justify-around'>
      <NavButton key='calendar' path='/calendar' label='캘린더' icon='Calendar' />
      <NavButton key='todo' path='/todo' label='투두' icon='Check' />
      <NavButton key='memo' path='/memo' label='메모' icon='Memo' />
      <NavButton key='link' path='/link' label='링크' icon='Link' />
    </div>
  );
};

export default Navigation;
