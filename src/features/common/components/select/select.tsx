import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './select.module.css';

type SelectProps = ComponentPropsWithoutRef<'select'> & {
  error?: string;
  label: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, label, ...rest }, ref) => {
    const errorId = className + '_error';
    const hasError = Boolean(error);
    return (
      <label className={clsx('subtitle2', styles.container, className)}>
        {label}
        <select
          aria-invalid={hasError}
          {...(hasError && { 'aria-errormessage': errorId })}
          className={clsx('body1', styles.select)}
          ref={ref}
          {...rest}
        >
          {children}
        </select>
        {hasError && (
          <strong className={clsx('subtitle2', styles.error)} id={errorId}>
            {error}
          </strong>
        )}
      </label>
    );
  }
);

Select.displayName = 'Select';

export default Select;
