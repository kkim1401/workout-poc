import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './text-field.module.css';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
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
