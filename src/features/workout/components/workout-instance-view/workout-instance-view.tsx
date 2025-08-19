'use client';

import { Button, Card } from '@/features/common/components';
import { updateWorkoutInstance } from '@/lib/api/db/workouts/mutations';
import { WorkoutInstance } from '@/lib/api/db/workouts/types';
import { useSupabaseBrowser } from '@/lib/supabase/client';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { revalidateWorkoutInstance } from '../../actions';
import { ExerciseList } from './exercise-list';
import { ExerciseLog } from './exercise-log';
import styles from './workout-instance-view.module.css';

type WorkoutInstanceViewProps = {
  className?: string;
  currentExerciseIndex?: number;
  workoutInstance: WorkoutInstance | null;
};

export default function WorkoutInstanceView({
  className,
  currentExerciseIndex,
  workoutInstance,
}: WorkoutInstanceViewProps) {
  const supabase = useSupabaseBrowser();
  const { mutate: updateWorkout, isPending } = useMutation({
    mutationFn: (data: Parameters<typeof updateWorkoutInstance>[1]) => {
      return updateWorkoutInstance(supabase, data);
    },
    onSuccess: () => {
      if (workoutInstance) {
        revalidateWorkoutInstance(workoutInstance.id);
      }
    },
  });
  const handleComplete = () => {
    if (isPending || !workoutInstance) return;

    updateWorkout({
      id: workoutInstance.id,
      completed_at: new Date().toISOString(),
    });
  };
  return (
    <Card className={clsx(styles.container, className)}>
      {typeof currentExerciseIndex !== 'number' ? (
        <>
          <h1 className='headline4'>{workoutInstance?.name}</h1>
          <ExerciseList
            className={styles.exerciseList}
            workoutInstance={workoutInstance}
          />
          {!workoutInstance?.completedAt ? (
            <Button
              className={styles.completeButton}
              disabled={isPending}
              onClick={handleComplete}
            >
              {isPending ? 'Completing...' : 'Complete Workout'}
            </Button>
          ) : (
            <p className={styles.completedAt}>
              Completed at:{' '}
              {new Date(workoutInstance.completedAt).toLocaleDateString()}
            </p>
          )}
        </>
      ) : (
        <ExerciseLog
          currentExerciseIndex={currentExerciseIndex}
          workoutInstance={workoutInstance}
        />
      )}
    </Card>
  );
}
