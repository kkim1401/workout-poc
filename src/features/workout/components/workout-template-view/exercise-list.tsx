import { SetTemplate } from '@/lib/api/db/sets/types';
import clsx from 'clsx';
import { groupSetsByExercise } from '../../helpers';
import styles from './exercise-list.module.css';

type ExerciseListProps = {
  className?: string;
  setTemplates: SetTemplate[] | null;
};

export default function ExerciseList({
  className,
  setTemplates,
}: ExerciseListProps) {
  if (!setTemplates || setTemplates.length === 0) {
    return <p>No exercises logged for this workout.</p>;
  }

  const exercises = groupSetsByExercise(setTemplates || []);

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
