import { login, signup } from './login-form-actions';
import styles from './login-form.module.css';

export default function LoginForm() {
  return (
    <form className={styles.container}>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
