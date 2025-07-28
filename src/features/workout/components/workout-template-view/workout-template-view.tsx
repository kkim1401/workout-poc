'use client';

import { Button, Card } from '@/features/common/components';
import { SetTemplate } from '@/lib/api/db/sets/types';
import { createWorkoutInstance } from '@/lib/api/db/workouts/mutations';
import { WorkoutInstance, WorkoutTemplate } from '@/lib/api/db/workouts/types';
import { createClient } from '@/lib/supabase/client';
import clsx from 'clsx';
import ExerciseList from './exercise-list';
import styles from './workout-template-view.module.css';

type WorkoutTemplateViewProps = {
  className?: string;
  userId: string;
  workoutInstance: WorkoutInstance | null;
  workoutTemplate: WorkoutTemplate | null;
  setTemplates: SetTemplate[] | null;
};

export default function WorkoutTemplateView({
  className,
  setTemplates,
  workoutInstance,
  workoutTemplate,
  userId,
}: WorkoutTemplateViewProps) {
  const supabase = createClient();

  const handleClick = async () => {
    if (!workoutTemplate && !workoutInstance) return;

    if (workoutTemplate) {
      await createWorkoutInstance(supabase, {
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
      <Button onClick={handleClick} className={styles.startButton}>
        {workoutInstance ? 'Continue Workout' : 'Start Workout'}
      </Button>
    </Card>
  );
}
