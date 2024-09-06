import styles from './button.module.css';
import { concatClasses } from '@/utils';
import { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: HTMLButtonElement['type'];
  variant?: 'contained' | 'raised' | 'text';
};

export default function Button({
  children,
  className,
  onClick,
  type = 'button',
  variant = 'contained',
}: ButtonProps) {
  return (
    <button
      className={concatClasses(
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
