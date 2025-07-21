import { SetTemplate } from '@/lib/api/db/sets/types';
import clsx from 'clsx';
import styles from './exercise-list.module.css';

type ExerciseListProps = {
  className?: string;
  setTemplates: SetTemplate[] | null;
};

const groupSetsByExercise = (setTemplates: SetTemplate[]) => {
  return setTemplates.reduce(
    (acc, setTemplate) => {
      const { exerciseId, exerciseName } = setTemplate;
      if (!acc[exerciseId]) {
        acc[exerciseId] = {
          id: exerciseId,
          exerciseName,
          setTemplates: [],
        };
      }
      acc[exerciseId].setTemplates.push(setTemplate);
      return acc;
    },
    {} as Record<
      string,
      { id: string; exerciseName: string; setTemplates: SetTemplate[] }
    >
  );
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
