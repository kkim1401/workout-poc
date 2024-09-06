'use client';
import { MouseEventHandler } from 'react';
import styles from './hamburger.module.css';
import { concatClasses } from '@/utils';

type HamburgerProps = {
  className?: string;
  isClosed?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Hamburger({
  className,
  isClosed,
  onClick,
}: HamburgerProps) {
  return (
    <button
      aria-label={isClosed ? 'Close menu' : 'Open menu'}
      className={concatClasses(
        styles.container,
        isClosed && styles.closed,
        className
      )}
      onClick={(e) => onClick?.(e)}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
}
