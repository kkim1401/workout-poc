import clsx from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './button.module.css';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'contained' | 'outlined' | 'text' | 'none';
};

export default function Button({
  children,
  className,
  variant = 'contained',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.container,
        variant === 'contained' && styles.contained,
        variant === 'outlined' && styles.outlined,
        variant === 'text' && styles.text,
        variant === 'none' && styles.none,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
