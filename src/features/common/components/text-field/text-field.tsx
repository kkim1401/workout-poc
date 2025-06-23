import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './text-field.module.css';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  error?: string | undefined;
  label: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, error, label, type = 'text', ...rest }, ref) => {
    const errorId = className + '_error';
    const hasError = Boolean(error);
    return (
      <label className={clsx(styles.container, className)}>
        {label}
        <input
          aria-invalid={hasError}
          {...(hasError && { 'aria-errormessage': errorId })}
          className={styles.input}
          ref={ref}
          type={type}
          {...rest}
        />
        {hasError && (
          <strong className={styles.error} id={errorId}>
            {error}
          </strong>
        )}
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
