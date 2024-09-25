import clsx from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './button.module.css';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'contained' | 'outlined' | 'text';
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
        variant === 'contained' && 'button',
        variant === 'contained' && styles.contained,
        variant === 'outlined' && 'button',
        variant === 'outlined' && styles.outlined,
        variant === 'text' && 'headline5',
        variant === 'text' && styles.text,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
