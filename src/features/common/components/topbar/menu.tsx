import { useSupabaseBrowser } from '@/utils/supabase/client';
import clsx from 'clsx';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import Hamburger from './hamburger';
import styles from './menu.module.css';

type MenuProps = {
  className?: string;
  isLoggedIn: boolean;
  links: {
    title: string;
    href: string;
  }[];
  onClose?: MouseEventHandler;
};

export default function Menu({
  className,
  isLoggedIn,
  links,
  onClose,
}: MenuProps) {
  const supabase = useSupabaseBrowser();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const menuLinks = [
    ...links,
    isLoggedIn
      ? { title: 'Settings', href: '/account' }
      : { title: 'Log In/Sign Up', href: '/login' },
  ];

  return (
    <div className={clsx(styles.container, className)}>
      <Hamburger closed onClick={onClose} />
      <ul className={styles.list}>
        {menuLinks.map((link) => (
          <li key={link.href} className={styles.link} onClick={onClose}>
            <Link className={clsx('headline6', styles.a)} href={link.href}>
              {link.title}
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li className={styles.link} onClick={handleLogOut}>
            <a className={clsx('headline6', styles.a)} href={'/login'}>
              Log Out
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
