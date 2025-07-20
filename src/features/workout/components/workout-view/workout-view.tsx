'use client';

import { Button, Card } from '@/features/common/components';
import { Set } from '@/lib/api/db/sets/types';
import { Workout } from '@/lib/api/db/workouts/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useActiveWorkout } from '../../hooks';
import ExerciseList from './exercise-list';
import styles from './workout-view.module.css';

type WorkoutViewProps = {
  className?: string;
  workout: Workout | null;
  sets: Set[] | null;
};

export default function WorkoutView({
  className,
  sets,
  workout,
}: WorkoutViewProps) {
  const { startWorkout } = useActiveWorkout();
  const router = useRouter();

  const handleClick = () => {
    if (workout) {
      startWorkout(workout.id);
      const firstUnassignedSet = sets?.find(
        (set) => set.repsAttempted === null
      );
      if (firstUnassignedSet) {
        router.push(`/workouts/${workout.id}/sets/${firstUnassignedSet.id}`);
      }
    } else {
      console.error('No workout available to start');
    }
  };

  return (
    <Card className={clsx(styles.container, className)}>
      <h1 className='headline4'>{workout?.name}</h1>
      <ExerciseList sets={sets} className={styles.exerciseList} />
      <Button onClick={handleClick} className={styles.startButton}>
        Start
      </Button>
    </Card>
  );
}
