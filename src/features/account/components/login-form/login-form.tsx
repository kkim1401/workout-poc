import { Button, TextField } from '@/features/common/components';
import clsx from 'clsx';
import styles from './login-form.module.css';

type LoginFormProps = {
  // eslint-disable-next-line no-unused-vars
  action: (formData: FormData) => void;
  className?: string;
};

export default function LoginForm({ action, className }: LoginFormProps) {
  return (
    <form action={action} className={clsx(styles.container, className)}>
      <h1 className='headline4'>Log In</h1>
      <TextField
        className={styles.textField}
        label='Email'
        name='email'
        type='email'
        required
      />
      <Button className={styles.button}>Sign In</Button>
    </form>
  );
}
