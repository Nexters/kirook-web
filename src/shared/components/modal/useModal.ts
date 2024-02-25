import { useContext } from 'react';
import { ModalContext } from './ModalContext';

export function useModal() {
  const context = useContext(ModalContext);

  return context;
}
