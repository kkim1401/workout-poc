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
      <TextField label='Email' name='email' type='email' required />
      <Button className={styles.button} formAction={signInWithEmail}>
        Sign In
      </Button>
    </Card>
  );
}
