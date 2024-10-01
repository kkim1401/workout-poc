import { createClient } from '@/utils/supabase/server';
import styles from './page.module.css';

export default async function LoginSuccessPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <section className={styles.container}>
      <h1 className='headline4'>Check your email</h1>
      <p className={styles.message}>
        We sent an email with a link that will log you in at{' '}
        <strong>{data?.user?.email}</strong>.
      </p>
    </section>
  );
}
