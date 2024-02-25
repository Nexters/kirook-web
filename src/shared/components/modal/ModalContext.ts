import { createContext } from 'react';
import type { ModalFactory } from './types';

export const ModalContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openModal<Return>(modalFactory: ModalFactory<Return>): Promise<Return | false> {
    throw new Error('ModalProvider is required');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  closeModal(modalId: string): void {
    throw new Error('ModalProvider is required');
  },
  closeAllModals(): void {
    throw new Error('ModalProvider is required');
  },
});
