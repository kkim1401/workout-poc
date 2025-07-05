import { LogWorkoutForm } from '@/features/workout/components';
import { getUser } from '@/lib/api/db/user/queries/server';
import { getWorkoutById } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const { data: workout } = await getWorkoutById(supabase, id);

  return (
    <section className={styles.container}>
      <LogWorkoutForm className={styles.logWorkoutForm} workout={workout} />
    </section>
  );
}
