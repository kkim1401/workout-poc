'use client';
import { useState } from 'react';
import Hamburger from './hamburger';
import styles from './topbar.module.css';
import { concatClasses } from '@/utils';
import Menu from './menu';

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuOpen = () => setShowMenu(true);
  const handleMenuClose = () => setShowMenu(false);

  return (
    <nav className={styles.container}>
      <div className={styles.topbar}>
        <Hamburger
          className={concatClasses(styles.hamburger, showMenu && styles.hidden)}
          onClick={handleMenuOpen}
        />
      </div>
      <div
        aria-hidden='true'
        className={concatClasses(styles.scrim, showMenu && styles.visible)}
        onClick={handleMenuClose}
      />
      <Menu
        className={concatClasses(styles.menu, showMenu && styles.visible)}
        onClose={handleMenuClose}
      />
    </nav>
  );
}
