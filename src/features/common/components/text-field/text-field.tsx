import { forwardRef, InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...inputProps }, ref) => {
    return (
      <label>
        {label}
        <input ref={ref} {...inputProps} />
      </label>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
