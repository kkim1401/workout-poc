'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Hamburger } from '../hamburger';
import styles from './topbar.module.css';
import { concatClassNames } from '@/utils';

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const handleHamburgerClick = () => setShowMenu(true);

  return (
    <nav className={styles.container}>
      <Hamburger className={styles.hamburger} onClick={handleHamburgerClick} />
      <div
        className={concatClassNames(
          styles.scrim,
          showMenu && styles.scrimVisible
        )}
      />
      <div
        className={concatClassNames(
          styles.menu,
          showMenu && styles.menuSelected
        )}
      >
        <Hamburger
          className={styles.hamburger}
          onClick={handleHamburgerClick}
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
