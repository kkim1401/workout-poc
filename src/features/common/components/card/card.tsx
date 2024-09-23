import clsx from 'clsx';
import { JSX, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import styles from './card.module.css';

type ValidTags = 'div' | 'section' | 'form';
type HTMLOrSVGElement = HTMLElement | SVGElement;

// Generic type to generate HTML props based on its tag
type CardProps<T extends ValidTags> = ComponentPropsWithoutRef<T> &
  HTMLAttributes<HTMLOrSVGElement> & {
    as?: T | ValidTags;
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
  ...rest
}: CardProps<T>): JSX.Element {
  return (
    <Component className={clsx(styles.container, className)} {...rest}>
      {children}
    </Component>
  );
}
