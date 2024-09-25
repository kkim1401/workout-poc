import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './text-field.module.css';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...rest }, ref) => {
    return (
      <label className={styles.container}>
        {label}
        <input className={styles.input} ref={ref} {...rest} />
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
