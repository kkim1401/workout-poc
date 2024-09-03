import styles from './button.module.css';
import { concatClassNames } from '@/utils';
import { MouseEventHandler, ReactNode } from 'react';

export default function Button({
  children,
  className,
  onClick,
  variant = 'default',
}: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'default' | 'text';
}) {
  return (
    <button
      className={concatClassNames(
        styles.container,
        variant === 'text' && 'headline5',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
