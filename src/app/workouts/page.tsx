import { WorkoutTemplateList } from '@/features/workout/components';
import { getUser } from '@/lib/api/db/user/queries/server';
import { getAllUserWorkoutTemplates } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutsPage() {
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const { data: workoutTemplates } = await getAllUserWorkoutTemplates(supabase);

  return (
    <section className={styles.container}>
      <WorkoutTemplateList
        className={styles.workoutTemplateList}
        workoutTemplates={workoutTemplates}
      />
    </section>
  );
}
