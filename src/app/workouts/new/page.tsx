import { CreateWorkoutForm } from '@/features/workout/components';
import { getUser } from '@/lib/api/db/user/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutsNewPage() {
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  return (
    <section className={styles.container}>
      <CreateWorkoutForm className={styles.createWorkoutForm} />
    </section>
  );
}
