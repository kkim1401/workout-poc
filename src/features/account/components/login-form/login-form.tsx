import { TextField } from '@/features/common/components';
import { login, signup } from './login-form-actions';
import styles from './login-form.module.css';

export default function LoginForm() {
  return (
    <form className={styles.container}>
      <TextField label='Email:' name='email' type='email' required />
      <TextField label='Password:' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
