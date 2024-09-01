'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Hamburger } from '../hamburger';
import styles from './topbar.module.css';
import { concatClassNames } from '@/utils';

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuOpen = () => setShowMenu(true);
  const handleMenuClose = () => setShowMenu(false);

  return (
    <nav className={styles.container}>
      <div className={styles.topbar}>
        <Hamburger
          className={concatClassNames(
            styles.hamburger,
            showMenu && styles.hidden
          )}
          onClick={handleMenuOpen}
        />
      </div>
      <div
        aria-hidden='true'
        className={concatClassNames(styles.scrim, showMenu && styles.visible)}
        onClick={handleMenuClose}
      />
      <div
        className={concatClassNames(styles.menu, showMenu && styles.visible)}
      >
        <Hamburger
          className={styles.hamburger}
          isClosed={true}
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
