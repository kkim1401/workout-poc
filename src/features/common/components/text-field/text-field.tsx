import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './text-field.module.css';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  error?: string;
  label: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, label, ...rest }, ref) => {
    const errorId = className + '_error';
    const hasError = Boolean(error);
    return (
      <label className={clsx('subtitle2', styles.container, className)}>
        {label}
        <input
          aria-invalid={hasError}
          {...(hasError && { 'aria-errormessage': errorId })}
          className={clsx('body1', styles.input)}
          ref={ref}
          {...rest}
        />
        {hasError && (
          <strong className={clsx('subtitle2', styles.error)} id={errorId}>
            {error}
          </strong>
        )}
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
