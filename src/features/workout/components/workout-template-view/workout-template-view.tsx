'use client';

import { Button, Card } from '@/features/common/components';
import { SetTemplate } from '@/lib/api/db/sets/types';
import { createWorkoutInstance } from '@/lib/api/db/workouts/mutations';
import {
  WorkoutInstance,
  WorkoutInstanceInputDTO,
  WorkoutTemplate,
} from '@/lib/api/db/workouts/types';
import { createClient } from '@/lib/supabase/client';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { revalidateWorkoutTemplate } from '../../actions';
import ExerciseList from './exercise-list';
import styles from './workout-template-view.module.css';

type WorkoutTemplateViewProps = {
  className?: string;
  userId: string;
  setTemplates: SetTemplate[] | null;
  workoutInstance: WorkoutInstance | null;
  workoutTemplate: WorkoutTemplate | null;
};

export default function WorkoutTemplateView({
  className,
  setTemplates,
  userId,
  workoutInstance,
  workoutTemplate,
}: WorkoutTemplateViewProps) {
  const supabase = createClient();
  const router = useRouter();

  const { mutate: startWorkout, isPending } = useMutation({
    mutationFn: (data: WorkoutInstanceInputDTO) =>
      createWorkoutInstance(supabase, data),
    onSuccess: (data) => {
      if (workoutTemplate) {
        revalidateWorkoutTemplate(workoutTemplate.id);
      }
      router.push(`/workouts/instances/${data.id}`);
    },
  });

  const handleClick = () => {
    if (isPending) return;

    if (workoutInstance) {
      router.push(`/workouts/instances/${workoutInstance.id}`);
      return;
    }

    if (workoutTemplate) {
      startWorkout({
        user_id: userId,
        workout_template_id: workoutTemplate.id,
      });
    }
  };

  return (
    <Card className={clsx(styles.container, className)}>
      <h1 className='headline4'>
        {workoutTemplate?.name || workoutInstance?.name || 'Unknown Workout'}
      </h1>
      <ExerciseList
        setTemplates={setTemplates}
        className={styles.exerciseList}
      />
      <Button
        disabled={isPending}
        onClick={handleClick}
        className={styles.startButton}
      >
        {workoutInstance ? 'Continue Workout' : 'Start Workout'}
      </Button>
    </Card>
  );
}
