import { WorkoutTemplateView } from '@/features/workout/components';
import { getUserSetTemplatesByWorkoutTemplateId } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import {
  getActiveUserWorkoutInstanceByWorkoutTemplateId,
  getUserWorkoutTemplateById,
} from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './page.module.css';

export default async function WorkoutTemplatePage({
  params,
}: {
  params: Promise<{ workoutTemplateId: string }>;
}) {
  const { workoutTemplateId } = await params;
  const supabase = await createClient();

  const { data, error } = await getUser(supabase);
  if (error || !data?.user) {
    redirect('/login');
  }

  const userId = data.user.id;

  const { data: workoutInstance } =
    await getActiveUserWorkoutInstanceByWorkoutTemplateId(
      supabase,
      workoutTemplateId
    );

  const { data: workoutTemplate } = !workoutInstance
    ? await getUserWorkoutTemplateById(supabase, workoutTemplateId)
    : { data: null };

  const { data: setTemplates } = await getUserSetTemplatesByWorkoutTemplateId(
    supabase,
    workoutTemplateId
  );

  return (
    <section className={styles.container}>
      <WorkoutTemplateView
        className={styles.workoutTemplateView}
        setTemplates={setTemplates}
        workoutInstance={workoutInstance}
        workoutTemplate={workoutTemplate}
        userId={userId}
      />
    </section>
  );
}
