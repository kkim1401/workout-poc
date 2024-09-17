'use client';

import { useState } from 'react';
import Hamburger from './hamburger';
import styles from './topbar.module.css';
import Menu from './menu';
import clsx from 'clsx';

type TopbarProps = {
  links: {
    title: string;
    href: string;
  }[];
};

export default function Topbar({ links }: TopbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuOpen = () => setShowMenu(true);
  const handleMenuClose = () => setShowMenu(false);

  return (
    <nav className={styles.container}>
      <div className={styles.topbar}>
        <Hamburger
          className={clsx(styles.hamburger, showMenu && styles.hidden)}
          onClick={handleMenuOpen}
        />
      </div>
      <div
        aria-hidden='true'
        className={clsx(styles.scrim, showMenu && styles.visible)}
        onClick={handleMenuClose}
      />
      <Menu
        className={clsx(styles.menu, showMenu && styles.visible)}
        links={links}
        onClose={handleMenuClose}
      />
    </nav>
  );
}
