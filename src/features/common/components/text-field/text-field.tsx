import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './text-field.module.css';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...inputProps }, ref) => {
    return (
      <label className={clsx('subtitle2', styles.container)}>
        {label}
        <input className={styles.input} ref={ref} {...inputProps} />
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
