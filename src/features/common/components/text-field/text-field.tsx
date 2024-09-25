import clsx from 'clsx';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styles from './text-field.module.css';

type TextFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, ...rest }, ref) => {
    return (
      <label className={clsx('subtitle2', styles.container, className)}>
        {label}
        <input className={clsx('body1', styles.input)} ref={ref} {...rest} />
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
