import { List } from '@/features/exercise/components';
import { getAllUserExercises, getUser } from '@/lib/api';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function ExercisesPage() {
  const supabase = await createClient();

  const user = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const exercises = await getAllUserExercises(supabase);

  return (
    <section className={styles.container}>
      <List className={styles.list} exercises={exercises} />
    </section>
  );
}
