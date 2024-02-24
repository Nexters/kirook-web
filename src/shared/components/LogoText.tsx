import { type ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { changwonDangamAsac } from '@/styles/fonts';

export function LogoText({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn('text-logo', changwonDangamAsac.className, className)}>{children}</h1>;
}
