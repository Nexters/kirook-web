import { LogoText } from '@/shared/components/LogoText';

interface HeaderProps {
  logoText: string;
  leftSideButton?: React.ReactNode;
  rightSideButton?: React.ReactNode;
}

export function Header({ logoText, leftSideButton, rightSideButton }: HeaderProps) {
  return (
    <div className='relative flex h-[44px] w-full shrink-0 items-center justify-between px-[15px]'>
      {leftSideButton}
      {rightSideButton}
      <LogoText className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>{logoText}</LogoText>
    </div>
  );
}
