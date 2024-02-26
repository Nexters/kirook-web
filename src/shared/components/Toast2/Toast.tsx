'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface ToastProps {
  message: string;
  delay: number;
  close(): void;
}

export function Toast({ message, delay, close }: ToastProps) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(true);

    let timerClose: NodeJS.Timeout;
    const timer = setTimeout(() => {
      setIsShow(false);

      timerClose = setTimeout(() => {
        close();
      }, 500);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerClose);
    };
  }, [close, delay]);

  return (
    <div
      className={cn(
        'absolute bottom-[100px] left-1/2 z-20 w-[345px] -translate-x-1/2 rounded-lg bg-black bg-opacity-90 px-8 py-5 text-title1 text-grayscale-50 opacity-0 transition-opacity duration-500 ease-out',
        {
          'opacity-100': isShow,
        },
      )}
    >
      {message}
    </div>
  );
}
