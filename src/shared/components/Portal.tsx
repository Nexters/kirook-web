import type { PropsWithChildren } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/shared/hooks/useMounted';

interface PortalProps {
  targetRoot: string;
}

export function Portal({ children, targetRoot }: PropsWithChildren<PortalProps>) {
  const elementRef = useRef<HTMLElement | null>(null);
  const mounted = useMounted();

  if (!mounted) return null;

  elementRef.current = document.getElementById(targetRoot);
  if (!elementRef.current) return null;

  return createPortal(children, elementRef.current);
}
