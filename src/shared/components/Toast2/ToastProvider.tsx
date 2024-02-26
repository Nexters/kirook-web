'use client';

import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { Toast } from './Toast';
import { ToastContext } from './ToastContext';
import { Portal } from '@/shared/components/Portal';

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [isToastMount, setIsToastMount] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const openToast = useCallback(
    (message: string) => {
      setToastMessage(message);

      if (isToastMount) {
        setIsToastMount(false);
        setTimeout(() => {
          setIsToastMount(true);
        }, 0);
        return;
      }

      setIsToastMount(true);
    },
    [isToastMount],
  );

  const closeToast = useCallback(() => {
    setIsToastMount(false);
  }, []);

  const contextValue = useMemo(() => ({ openToast }), [openToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Portal targetRoot='toast-root'>
        {isToastMount && <Toast message={toastMessage} delay={2000} close={() => closeToast()} />}
      </Portal>
    </ToastContext.Provider>
  );
}
