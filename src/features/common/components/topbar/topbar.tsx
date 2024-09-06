'use client';
import { useState } from 'react';
import Link from 'next/link';
import Hamburger from './hamburger';
import styles from './topbar.module.css';
import { concatClasses } from '@/utils';

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
      <div className={concatClasses(styles.menu, showMenu && styles.visible)}>
        <Hamburger
          className={styles.hamburger}
          closed
          onClick={handleMenuClose}
        />
        <ul className={styles.list}>
          <li>
            <Link href='/settings'>Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
