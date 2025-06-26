'use client';

import { useForkedRef } from '@/lib/utils';
import {
  forwardRef,
  ReactNode,
  useRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { Button } from '../button';
import styles from './modal.module.css';

type ModalProps = ComponentPropsWithoutRef<'dialog'> & {
  children: ReactNode;
  onClose?: () => void;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ children, ...rest }, ref) => {
    const localRef = useRef<HTMLDialogElement>(null);
    const forkedRef = useForkedRef<HTMLDialogElement>(ref, localRef);
    const handleClose = () => {
      localRef.current?.close();
    };
    return (
      <dialog className={styles.container} ref={forkedRef} {...rest}>
        <section className={styles.content}>
          <Button
            aria-label='Close Modal'
            onClick={handleClose}
            className={styles.close}
            variant='none'
            autoFocus
          >
            &times;
          </Button>
          {children}
        </section>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
