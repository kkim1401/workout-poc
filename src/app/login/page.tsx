import { LoginForm } from '@/features/account/components';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <section className={styles.container}>
      <LoginForm />
    </section>
  );
}
