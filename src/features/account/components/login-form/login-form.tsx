'use client';

import { Button, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { useActionState } from 'react';
import styles from './login-form.module.css';

type LoginFormProps = {
  /* eslint-disable no-unused-vars*/
  loginAction: (
    prevData: unknown,
    formData: FormData
  ) => Promise<{ formErrors?: { email?: string[] }; message?: '' } | void>;
  /* eslint-enable no-unused-vars*/
  className?: string;
};

const initialState = {};

export default function LoginForm({ className, loginAction }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form action={formAction} className={clsx(styles.container, className)}>
      <h1 className='headline4'>Log In</h1>
      {state?.message && (
        <strong className={styles.error}>{state?.message}</strong>
      )}
      <TextField
        className={styles.textField}
        error={state?.formErrors?.email?.join(' ')}
        label='Email'
        name='email'
        type='email'
        required
      />
      <SubmitButton disabled={pending} />
    </form>
  );
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <Button disabled={disabled} className={styles.button}>
      Sign In
    </Button>
  );
}
