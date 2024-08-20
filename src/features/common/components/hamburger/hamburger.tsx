'use client';

import { MouseEventHandler } from 'react';
import styles from './hamburger.module.css';
import { concatClassNames } from '@/utils';

type HamburgerProps = {
  className?: string;
  onClick?: MouseEventHandler;
  closed?: boolean;
};

export default function Hamburger(props: HamburgerProps) {
  return (
    <button
      aria-label={props.closed ? 'Close menu' : 'Open menu'}
      className={concatClassNames(
        styles.container,
        props.closed && styles.closed,
        props.className
      )}
      onClick={(e) => props?.onClick?.(e)}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
}
