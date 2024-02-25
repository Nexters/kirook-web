import { type ReactNode } from 'react';

export type ModalFactory<Return> = (close: (result: Return) => void, id: string) => ReactNode;

export interface ModalItem {
  id: string;
  ModalComponent: ReactNode;
}
