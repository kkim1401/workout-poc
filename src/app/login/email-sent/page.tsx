import { cookies } from 'next/headers';
import styles from './page.module.css';

export default async function LoginEmailSentPage() {
  const email = cookies().get('email')?.value;
  return (
    <section className={styles.container}>
      <h1 className='headline4'>Check your email</h1>
      <p className={styles.message}>
        We sent an email with a link that will log you in at{' '}
        <strong>{email}</strong>.
      </p>
    </section>
  );
}
