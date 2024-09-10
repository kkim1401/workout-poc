import styles from './menu.module.css';
import Hamburger from './hamburger';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import clsx from 'clsx';

type MenuProps = {
  className?: string;
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export default function Menu({ className, onClose }: MenuProps) {
  return (
    <div className={clsx(styles.container, className)}>
      <Hamburger closed onClick={onClose} />
      <ul className={styles.list}>
        <li className={styles.link}>
          <Link href='/settings'>Settings</Link>
        </li>
      </ul>
    </div>
  );
}
