'use client';

import { MouseEventHandler } from 'react';
import styles from './hamburger.module.css';
import clsx from 'clsx';

type HamburgerProps = {
  className?: string;
  closed?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Hamburger({
  className,
  closed,
  onClick,
}: HamburgerProps) {
  return (
    <button
      aria-label={closed ? 'Close menu' : 'Open menu'}
      className={clsx(styles.container, closed && styles.closed, className)}
      onClick={(e) => onClick?.(e)}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
}
