import { WorkoutView } from '@/features/workout/components';
import { getUserSetsByWorkoutId } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import { getUserWorkoutById } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const { workoutId } = await params;
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const { data: workout } = await getUserWorkoutById(supabase, workoutId);
  const { data: sets } = workout?.id
    ? await getUserSetsByWorkoutId(supabase, workout.id)
    : { data: null };

  return (
    <section className={styles.container}>
      <WorkoutView
        className={styles.workoutView}
        workout={workout}
        sets={sets}
      />
    </section>
  );
}
