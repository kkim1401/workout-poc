import { WorkoutTemplateView } from '@/features/workout/components';
import { getUserSetTemplatesByWorkoutTemplateId } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import { getUserWorkoutTemplateById } from '@/lib/api/db/workouts/queries/server';
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

  const { data: workoutTemplate } = await getUserWorkoutTemplateById(
    supabase,
    workoutTemplateId
  );

  const { data: setTemplates } = workoutTemplate
    ? await getUserSetTemplatesByWorkoutTemplateId(supabase, workoutTemplateId)
    : { data: null };

  return (
    <section className={styles.container}>
      <WorkoutTemplateView
        className={styles.workoutTemplateView}
        setTemplates={setTemplates}
        workoutTemplate={workoutTemplate}
        userId={userId}
      />
    </section>
  );
}
