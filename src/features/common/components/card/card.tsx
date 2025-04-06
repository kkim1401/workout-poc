import clsx from 'clsx';
import { JSX, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import styles from './card.module.css';

type ValidTags = 'div' | 'section' | 'form' | 'details';
type HTMLOrSVGElement = HTMLElement | SVGElement;

// Generic type to generate HTML props based on its tag
type CardProps<T extends ValidTags> = ComponentPropsWithoutRef<T> &
  HTMLAttributes<HTMLOrSVGElement> & {
    as?: T | ValidTags;
    depth?: 'shallow' | 'normal' | 'deep';
  };

/**
 * Make the default tag a constant to make it easy to infer both the default
 * generic parameter and the `tag` prop
 */
const DEFAULT_TAG = 'div' as const;

export default function Card<T extends ValidTags>({
  as: Component = DEFAULT_TAG,
  children,
  className,
  depth = 'normal',
  ...rest
}: CardProps<T>): JSX.Element {
  return (
    <Component
      className={clsx(
        styles.container,
        depth === 'shallow' && styles.shallow,
        depth === 'deep' && styles.deep,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
