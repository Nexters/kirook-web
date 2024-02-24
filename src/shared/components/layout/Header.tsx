'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@/shared/components/Icon';
import { LogoText } from '@/shared/components/LogoText';

interface HeaderProps {
  logoText: string;
  showBackButton?: boolean;
  // 얘는 동작을 부모가 정의하기 편하게 ReactNode로 전달
  rightSideButton?: React.ReactNode;
}

export function Header({ logoText, showBackButton = false, rightSideButton }: HeaderProps) {
  const router = useRouter();

  return (
    <div className='relative flex h-[44px] w-full items-center justify-between px-[15px]'>
      {showBackButton && (
        <button className='flex' type='button' onClick={() => router.back()}>
          <Icon iconType='ChevronLeft' width={24} height={24} className='stroke-grayscale-900' />
        </button>
      )}
      {rightSideButton}
      <LogoText className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>{logoText}</LogoText>
    </div>
  );
}
