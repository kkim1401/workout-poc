import { WorkoutInstance } from '@/lib/api/db/workouts/types';
import clsx from 'clsx';
import { groupSetsByExercise } from '../../../helpers';
import styles from './exercise-list.module.css';

type ExerciseListProps = {
  className?: string;
  currentExerciseIndex?: number;
  workoutInstance?: WorkoutInstance | null;
};

export default function ExerciseList({
  className,
  workoutInstance,
}: ExerciseListProps) {
  if (!workoutInstance || workoutInstance?.setTemplates?.length === 0) {
    return <p>No exercises logged for this workout.</p>;
  }

  const exercises = groupSetsByExercise(workoutInstance);

  return (
    <ol role='list' className={clsx(styles.container, className)}>
      {Object.values(exercises).map((exercise) => (
        <li key={exercise.id} className={styles.exerciseItem}>
          <span className='headline6'>{exercise.exerciseName}</span>
          <ol className={styles.setList}>
            {exercise.setTemplates.map((setTemplate) => (
              <li key={setTemplate.id} className={styles.setItem}>
                <span>{setTemplate.weightTarget} lbs, </span>
                <span>{setTemplate.repsTarget} reps</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
