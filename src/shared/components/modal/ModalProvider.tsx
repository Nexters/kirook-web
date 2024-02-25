'use client';

import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { Modal } from './Modal';
import { ModalContext } from './ModalContext';
import type { ModalFactory, ModalItem } from './types';
import { Portal } from '@/shared/components/Portal';
import { v4 as uuidv4 } from 'uuid';

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const closeModal = useCallback((id: string) => {
    setModals((modals) => {
      return modals.filter((modal) => modal.id !== id);
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const openModal = useCallback(
    function <Return>(modalFactory: ModalFactory<Return>): Promise<Return | false> {
      return new Promise((resolve) => {
        const id = uuidv4();
        setModals((modals) => {
          const ModalComponent = modalFactory((result: Return) => {
            closeModal(id);
            resolve(result);
          }, id);

          return [
            ...modals,
            {
              id,
              ModalComponent,
            },
          ];
        });
      });
    },
    [closeModal],
  );

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
    }),
    [openModal, closeModal, closeAllModals],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Portal targetRoot='modal-root'>
        {modals.map(({ id, ModalComponent }) => (
          <Modal key={id}>{ModalComponent}</Modal>
        ))}
      </Portal>
    </ModalContext.Provider>
  );
}
