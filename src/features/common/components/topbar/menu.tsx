import styles from './menu.module.css';
import Hamburger from './hamburger';
import { concatClasses } from '@/utils';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type MenuProps = {
  className?: string;
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export default function Menu({ className, onClose }: MenuProps) {
  return (
    <div className={concatClasses(styles.container, className)}>
      <Hamburger closed onClick={onClose} />
      <ul className={styles.list}>
        <li className={styles.link}>
          <Link href='/settings'>Settings</Link>
        </li>
      </ul>
    </div>
  );
}
