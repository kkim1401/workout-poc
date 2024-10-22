import clsx from 'clsx';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import styles from './link.module.css';

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  color?: 'primary' | 'primaryDark' | 'black';
  size?: 'small' | 'large';
};

export default function Link({
  color = 'primaryDark',
  size = 'small',
  className,
  ...rest
}: LinkProps) {
  return (
    <NextLink
      className={clsx(
        styles.container,
        color === 'primary' && styles.primary,
        color === 'primaryDark' && styles.primaryDark,
        color === 'black' && styles.black,
        size === 'large' && 'link1',
        size === 'small' && 'link2',
        className
      )}
      {...rest}
    />
  );
}
