import { Card, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { login, signup } from './login-form-actions';
import styles from './login-form.module.css';

type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  return (
    <Card as='form' className={clsx(styles.container, className)}>
      <TextField label='Email' name='email' type='email' required />
      <TextField label='Password' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </Card>
  );
}
