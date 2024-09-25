import { Button, Card, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { signInWithEmail } from './login-form-actions';
import styles from './login-form.module.css';

type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  return (
    <Card as='form' className={clsx(styles.container, className)}>
      <h1 className='headline4'>Log In</h1>
      <TextField
        className={styles.textField}
        label='Email'
        name='email'
        type='email'
        required
      />
      <Button className={styles.button} formAction={signInWithEmail}>
        Sign In
      </Button>
    </Card>
  );
}
