'use client';

import { Button, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { useActionState } from 'react';
import styles from './login-form.module.css';

type LoginFormProps = {
  /* eslint-disable no-unused-vars*/
  action: (
    prevData: unknown,
    formData: FormData
  ) => Promise<{ fieldErrors?: { email?: string[] }; message?: string } | void>;
  /* eslint-enable no-unused-vars*/
  className?: string;
};

const initialState = {};

export default function LoginForm({ action, className }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className={clsx(styles.container, className)}>
      <h1 className='headline4'>Log In</h1>
      {state?.message && (
        <strong className={styles.error}>{state?.message}</strong>
      )}
      <TextField
        className={styles.textField}
        error={state?.fieldErrors?.email?.join(' ')}
        label='Email'
        name='email'
        type='email'
        required
      />
      <Button disabled={pending} className={styles.button}>
        Sign In
      </Button>
    </form>
  );
}
