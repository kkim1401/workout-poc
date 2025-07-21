'use client';

import { Button, Card } from '@/features/common/components';
import { SetTemplate } from '@/lib/api/db/sets/types';
import { WorkoutTemplate } from '@/lib/api/db/workouts/types';
import clsx from 'clsx';
// import { useRouter } from 'next/navigation';
// import { useActiveWorkout } from '../../hooks';
import ExerciseList from './exercise-list';
import styles from './workout-template-view.module.css';

type WorkoutTemplateViewProps = {
  className?: string;
  workoutTemplate: WorkoutTemplate | null;
  setTemplates: SetTemplate[] | null;
};

export default function WorkoutTemplateView({
  className,
  setTemplates,
  workoutTemplate,
}: WorkoutTemplateViewProps) {
  // const { startWorkout } = useActiveWorkout();
  // const router = useRouter();

  const handleClick = () => {};

  return (
    <Card className={clsx(styles.container, className)}>
      <h1 className='headline4'>{workoutTemplate?.name}</h1>
      <ExerciseList
        setTemplates={setTemplates}
        className={styles.exerciseList}
      />
      <Button onClick={handleClick} className={styles.startButton}>
        Start
      </Button>
    </Card>
  );
}
