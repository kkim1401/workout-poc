'use client';

import { MouseEventHandler } from 'react';
import styles from './hamburger.module.css';
import { concatClassNames } from '@/utils';

export default function Hamburger({
  className,
  isClosed,
  onClick,
}: {
  className?: string;
  isClosed?: boolean;
  onClick?: MouseEventHandler;
}) {
  return (
    <button
      aria-label={isClosed ? 'Close menu' : 'Open menu'}
      className={concatClassNames(
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
