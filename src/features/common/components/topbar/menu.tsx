import styles from './menu.module.css';
import Hamburger from './hamburger';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import clsx from 'clsx';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type MenuProps = {
  className?: string;
  links: `/${string}`[];
  onClose?: MouseEventHandler<HTMLButtonElement>;
};

export default function Menu({ className, links, onClose }: MenuProps) {
  return (
    <div className={clsx(styles.container, className)}>
      <Hamburger closed onClick={onClose} />
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link} className={styles.link}>
            <Link href={link}>{capitalizeFirstLetter(link.slice(1))}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
