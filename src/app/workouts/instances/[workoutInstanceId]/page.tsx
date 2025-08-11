import { WorkoutInstanceView } from '@/features/workout/components';
import { getUserWorkoutInstanceById } from '@/lib/api/db/workouts/queries/server';
import { createClient } from '@/lib/supabase/server';
import styles from './page.module.css';

export default async function ActiveWorkoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ workoutInstanceId: string }>;
  searchParams: Promise<{ index?: string | undefined }>;
}) {
  const { workoutInstanceId } = await params;
  const { index } = await searchParams;
  const supabase = await createClient();

  const { data: workoutInstance } = await getUserWorkoutInstanceById(
    supabase,
    workoutInstanceId
  );

  return (
    <section className={styles.container}>
      <WorkoutInstanceView
        className={styles.workoutInstanceView}
        currentExerciseIndex={index ? parseInt(index) : undefined}
        workoutInstance={workoutInstance}
      />
    </section>
  );
}
