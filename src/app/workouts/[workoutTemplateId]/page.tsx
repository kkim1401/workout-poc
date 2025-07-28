import { WorkoutTemplateView } from '@/features/workout/components';
import { getUserSetTemplatesByWorkoutTemplateId } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import {
  getLatestUserWorkoutInstanceByWorkoutTemplateId,
  getUserWorkoutTemplateById,
} from '@/lib/api/db/workouts/queries/server';
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

  const { data, error } = await getUser(supabase);
  if (error || !data?.user) {
    redirect('/login');
  }

  const userId = data.user.id;

  const { data: workoutInstance } =
    await getLatestUserWorkoutInstanceByWorkoutTemplateId(
      supabase,
      workoutTemplateId
    );

  const isWorkoutActive = Boolean(
    workoutInstance && !workoutInstance.completedAt
  );

  const { data: workoutTemplate } = !isWorkoutActive
    ? await getUserWorkoutTemplateById(supabase, workoutTemplateId)
    : { data: null };

  const { data: setTemplates } = workoutTemplate?.id
    ? await getUserSetTemplatesByWorkoutTemplateId(supabase, workoutTemplate.id)
    : { data: null };

  return (
    <section className={styles.container}>
      <WorkoutTemplateView
        className={styles.workoutTemplateView}
        workoutInstance={workoutInstance}
        workoutTemplate={workoutTemplate}
        setTemplates={setTemplates}
        userId={userId}
      />
    </section>
  );
}
