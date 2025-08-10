import { Card } from '@/features/common/components';
import { WorkoutInstance } from '@/lib/api/db/workouts/types';
import clsx from 'clsx';
import { ExerciseList } from './exercise-list';
import { ExerciseLog } from './exercise-log';
import styles from './workout-instance-view.module.css';

type WorkoutInstanceViewProps = {
  className?: string;
  currentExerciseIndex?: number;
  view?: string;
  workoutInstance: WorkoutInstance | null;
};

export default function WorkoutInstanceView({
  className,
  currentExerciseIndex = 0,
  view = 'list',
  workoutInstance,
}: WorkoutInstanceViewProps) {
  return (
    <Card className={clsx(styles.container, className)}>
      {view === 'list' ? (
        <>
          <h1 className='headline4'>{workoutInstance?.name}</h1>
          <ExerciseList
            currentExerciseIndex={currentExerciseIndex}
            workoutInstance={workoutInstance}
          />
        </>
      ) : (
        <ExerciseLog
          currentExerciseIndex={currentExerciseIndex}
          workoutInstance={workoutInstance}
        />
      )}
    </Card>
  );
}
