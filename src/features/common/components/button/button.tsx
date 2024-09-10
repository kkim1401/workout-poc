import styles from './button.module.css';
import clsx from 'clsx';
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
      className={clsx(
        styles.container,
        variant === 'contained' && styles.contained,
        variant === 'raised' && styles.raised,
        variant === 'text' && 'headline5',
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
