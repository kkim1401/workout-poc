import { WorkoutTemplateView } from '@/features/workout/components';
import { getUserSetTemplatesByWorkoutTemplateId } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import { getUserWorkoutTemplateById } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ workoutTemplateId: string }>;
}) {
  const { workoutTemplateId } = await params;
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const { data: workoutTemplate } = await getUserWorkoutTemplateById(
    supabase,
    workoutTemplateId
  );
  const { data: setTemplates } = workoutTemplate?.id
    ? await getUserSetTemplatesByWorkoutTemplateId(supabase, workoutTemplate.id)
    : { data: null };

  return (
    <section className={styles.container}>
      <WorkoutTemplateView
        className={styles.workoutTemplateView}
        workoutTemplate={workoutTemplate}
        setTemplates={setTemplates}
      />
    </section>
  );
}
