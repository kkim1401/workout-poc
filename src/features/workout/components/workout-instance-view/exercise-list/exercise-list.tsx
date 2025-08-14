import { SetInstance } from '@/lib/api/db/sets/types';
import { WorkoutInstance } from '@/lib/api/db/workouts/types';
import clsx from 'clsx';
import Link from 'next/link';
import { groupSetsByExercise } from '../../../helpers';
import styles from './exercise-list.module.css';

type ExerciseListProps = {
  className?: string;
  workoutInstance?: WorkoutInstance | null;
};

const sortSetInstances = (setInstances: SetInstance[]) =>
  setInstances.sort((a, b) => a.orderInWorkout - b.orderInWorkout);

export default function ExerciseList({
  className,
  workoutInstance,
}: ExerciseListProps) {
  if (!workoutInstance) {
    return <p>No exercises logged for this workout.</p>;
  }

  const exercises = groupSetsByExercise(workoutInstance);

  return (
    <ol role='list' className={clsx(styles.container, className)}>
      {Object.values(exercises).map((exercise, index) => (
        <li key={exercise.id} className={styles.exerciseItem}>
          <Link
            href={`/workouts/instances/${workoutInstance.id}?index=${index}`}
            className='headline6'
          >
            {exercise.exerciseName}
          </Link>
          <ol className={styles.setList}>
            {sortSetInstances(exercise.setInstances).map(
              (setInstance) =>
                typeof setInstance.repsCompleted === 'number' && (
                  <li key={setInstance.id} className={styles.setItem}>
                    <span>{setInstance.weightUsed} lbs, </span>
                    <span>{setInstance.repsCompleted} reps</span>
                  </li>
                )
            )}
          </ol>
        </li>
      ))}
    </ol>
  );
}
