import { createContext } from 'react';

interface ToastContextType {
  openToast(message: string): void;
}

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);
