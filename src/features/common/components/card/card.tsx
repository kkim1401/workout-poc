import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  DetailsHTMLAttributes,
  HTMLAttributes,
  JSX,
} from 'react';
import styles from './card.module.css';

type ValidTags = keyof JSX.IntrinsicElements;
type HTMLOrSVGElement = HTMLElement | SVGElement;

// Generic type to generate HTML props based on its tag
type CardProps<T extends ValidTags> = {
  as: ValidTags;
} & (ComponentPropsWithoutRef<T> &
  HTMLAttributes<HTMLOrSVGElement> &
  DetailsHTMLAttributes<HTMLDetailsElement>);

/**
 * Make the default tag a constant to make it easy to infer both the default
 * generic parameter and the `tag` prop
 */
const DEFAULT_TAG = 'div' as const;

export default function Card<T extends ValidTags = typeof DEFAULT_TAG>({
  as = DEFAULT_TAG,
  children,
  className,
  ...rest
}: CardProps<T>): JSX.Element {
  /**
   * Assign the `tag` prop to a variable `Card` of type ValidTags.
   *
   * The reason for doing this instead of rendering the `<Tag />` right away
   * is that the TypeScript compiler will yell at you with:
   * `Expression produces a union type that is too complex to represent`
   */
  const Component: ValidTags = as;

  // Render the custom tag with its props
  return (
    <Component className={clsx(styles.container, className)} {...rest}>
      {children}
    </Component>
  );
}
