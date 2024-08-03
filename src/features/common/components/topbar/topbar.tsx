import React from 'react';
import { Hamburger } from '../hamburger';
import styles from './topbar.module.css'

export default function Topbar() {
  return (
    <nav className={styles.container}>
      <Hamburger className={styles.hamburger}/>
    </nav>
  )
}