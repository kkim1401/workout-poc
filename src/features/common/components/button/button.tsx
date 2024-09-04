import styles from './button.module.css';
import { concatClassNames } from '@/utils';
import { MouseEventHandler, ReactNode } from 'react';

export default function Button({
  children,
  className,
  onClick,
  type = 'button',
  variant = 'contained',
}: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: HTMLButtonElement['type'];
  variant?: 'contained' | 'raised' | 'text';
}) {
  return (
    <button
      className={concatClassNames(
        styles.container,
        variant === 'contained' && styles.contained,
        variant === 'raised' && styles.raised,
        variant === 'text' && styles.text,
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
