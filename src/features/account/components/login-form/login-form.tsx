'use client';

import { Button, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import styles from './login-form.module.css';

type LoginFormProps = {
  /* eslint-disable no-unused-vars*/
  loginAction: (
    prevData: unknown,
    formData: FormData
  ) => Promise<{ errors: { email?: string[] } } | void>;
  /* eslint-enable no-unused-vars*/
  className?: string;
};

export default function LoginForm({ className, loginAction }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, null);
  return (
    <form action={formAction} className={clsx(styles.container, className)}>
      <h1 className='headline4'>Log In</h1>
      <TextField
        className={styles.textField}
        error={state?.errors?.email?.join(' ')}
        label='Email'
        name='email'
        type='email'
        required
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className={styles.button}>
      Sign In
    </Button>
  );
}
