import React, { useState } from 'react';
import Link from 'next/link';
import { Hamburger } from '../hamburger';
import styles from './topbar.module.css';
import { concatClassNames } from '@/utils';

export default function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const handleHamburgerClick = () => setShowMenu(true);

  return (
    <nav className={styles.container}>
      <Hamburger onClick={handleHamburgerClick} />
      <ui
        className={concatClassNames(
          styles.menu,
          showMenu && styles.menuSelected
        )}
      >
        <li>
          <Link href='/settings'>Settings</Link>
        </li>
      </ui>
    </nav>
  );
}
