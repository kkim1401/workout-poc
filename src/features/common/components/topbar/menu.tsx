import styles from './menu.module.css';
import Hamburger from './hamburger';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import clsx from 'clsx';

type MenuProps = {
  className?: string;
  links: {
    title: string;
    href: string;
  }[];
  onClose?: MouseEventHandler;
};

export default function Menu({ className, links, onClose }: MenuProps) {
  return (
    <div className={clsx(styles.container, className)}>
      <Hamburger closed onClick={onClose} />
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href} className={styles.link} onClick={onClose}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
