'use client';

import { MouseEventHandler } from 'react';
import styles from './hamburger.module.css';
import { concatClassNames } from '@/utils';

type HamburgerProps = {
  className?: string;
  onClick?: MouseEventHandler;
};

export default function Hamburger(props: HamburgerProps) {
  return (
    <div
      className={concatClassNames(styles.container, props.className)}
      onClick={(e) => props?.onClick?.(e)}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </div>
  );
}
