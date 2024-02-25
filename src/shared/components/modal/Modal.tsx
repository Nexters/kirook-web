'use client';

import { type ReactNode } from 'react';

// import FocusTrap from 'focus-trap-react';

interface ModalProps {
  children: ReactNode;
  className?: string;
}

export function Modal({ children, className }: ModalProps) {
  return (
    // FIXME: 왜 안되지 focus trap..
    // <FocusTrap focusTrapOptions={{ escapeDeactivates: false }}>
    <div tabIndex={-1} role='dialog' aria-modal className={className}>
      {children}
    </div>
    // </FocusTrap>
  );
}
