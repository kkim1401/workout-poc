import { WorkoutList } from '@/features/workout/components';
import { getUser } from '@/lib/api/db/user/queries/server';
import { getAllUserWorkouts } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutsPage() {
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const { data: workouts } = await getAllUserWorkouts(supabase);

  return (
    <section className={styles.container}>
      <WorkoutList className={styles.workoutList} workouts={workouts} />
    </section>
  );
}
