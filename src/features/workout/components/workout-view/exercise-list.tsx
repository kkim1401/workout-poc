import { Set } from '@/lib/api/db/sets/types';
import clsx from 'clsx';
import styles from './exercise-list.module.css';

type ExerciseListProps = {
  className?: string;
  sets: Set[] | null;
};

const groupSetsByExercise = (sets: Set[]) => {
  return sets.reduce(
    (acc, set) => {
      const { exerciseId, exerciseName } = set;
      if (!acc[exerciseId]) {
        acc[exerciseId] = {
          id: exerciseId,
          exerciseName,
          sets: [],
        };
      }
      acc[exerciseId].sets.push(set);
      return acc;
    },
    {} as Record<string, { id: string; exerciseName: string; sets: Set[] }>
  );
};

export default function ExerciseList({ className, sets }: ExerciseListProps) {
  if (!sets || sets.length === 0) {
    return <p>No exercises logged for this workout.</p>;
  }

  const exercises = groupSetsByExercise(sets || []);

  return (
    <ol role='list' className={clsx(styles.container, className)}>
      {Object.values(exercises).map((exercise) => (
        <li key={exercise.id} className={styles.exerciseItem}>
          <span className='headline6'>{exercise.exerciseName}</span>
          <ol className={styles.setList}>
            {exercise.sets.map((set) => (
              <li key={set.id} className={styles.setItem}>
                <span>{set.weight} lbs, </span>
                <span>{set.reps} reps</span>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
