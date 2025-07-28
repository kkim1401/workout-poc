'use client';

import { Button, Card } from '@/features/common/components';
import { SetTemplate } from '@/lib/api/db/sets/types';
import { createWorkoutInstance } from '@/lib/api/db/workouts/mutations';
import {
  WorkoutInstanceInsertDTO,
  WorkoutTemplate,
} from '@/lib/api/db/workouts/types';
import { createClient } from '@/lib/supabase/client';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import ExerciseList from './exercise-list';
import styles from './workout-template-view.module.css';

type WorkoutTemplateViewProps = {
  className?: string;
  userId: string;
  setTemplates: SetTemplate[] | null;
  workoutTemplate: WorkoutTemplate | null;
};

export default function WorkoutTemplateView({
  className,
  setTemplates,
  userId,
  workoutTemplate,
}: WorkoutTemplateViewProps) {
  const supabase = createClient();
  const router = useRouter();

  const { mutate: startWorkout, isPending } = useMutation({
    mutationFn: (data: WorkoutInstanceInsertDTO) =>
      createWorkoutInstance(supabase, data),
    onSuccess: (data) => {
      router.push(`/workouts/instances/${data.id}`);
    },
  });

  const handleClick = () => {
    if (!workoutTemplate) return;

    if (workoutTemplate) {
      startWorkout({
        name: workoutTemplate.name,
        user_id: userId,
        workout_template_id: workoutTemplate.id,
      });
    }
  };

  return (
    <Card className={clsx(styles.container, className)}>
      <h1 className='headline4'>{workoutTemplate?.name}</h1>
      <ExerciseList
        setTemplates={setTemplates}
        className={styles.exerciseList}
      />
      <Button
        disabled={isPending}
        onClick={handleClick}
        className={styles.startButton}
      >
        Start Workout
      </Button>
    </Card>
  );
}
