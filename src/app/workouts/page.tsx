import { List } from '@/features/exercise/components';
import { getUser } from '@/lib/api/db/user/queries/server';
// import { getAllUserWorkouts } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function ExercisesPage() {
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  return (
    <section className={styles.container}>
      <List onExerciseClick={() => {}} className={styles.list} />
    </section>
  );
}
