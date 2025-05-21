import { Button, Card } from '@/features/common/components';
import { Exercise } from '@/lib/api/db/exercises/types';
import { Set } from '@/lib/api/db/sets/types';
import { Plus } from 'lucide-react';
import { ChangeEventHandler } from 'react';
import styles from './exercise-field-item.module.css';
import { SetCard } from './set-card';

type ExerciseFieldItemProps = {
  exerciseName: Exercise['name'];
  onAddSetClick: () => void;
  // eslint-disable-next-line no-unused-vars
  onSetChange: (set: Partial<Set>, index: number) => void;
  sets?: Partial<Set>[];
};

export default function ExerciseFieldItem({
  exerciseName,
  onAddSetClick,
  onSetChange,
  sets,
}: ExerciseFieldItemProps) {
  const createRepsChangeHandler =
    (set: Partial<Set>, index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const reps = e.target.value;
      onSetChange(
        {
          ...set,
          reps: Number(reps),
        },
        index
      );
    };

  const createWeightChangeHandler =
    (set: Partial<Set>, index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const weight = e.target.value;
      onSetChange(
        {
          ...set,
          weight: Number(weight),
        },
        index
      );
    };

  return (
    <Card depth='shallow' as='details' className={styles.container}>
      <summary>{exerciseName}</summary>
      <Card depth='shallow' className={styles.sets} as='section'>
        <p className='subtitle1'>Sets</p>
        <div className={styles.setItems}>
          {sets &&
            sets.length > 0 &&
            sets.map((set, i) => (
              <SetCard
                className={styles.setItem}
                key={i}
                set={set}
                index={i}
                onRepsChange={createRepsChangeHandler(set, i)}
                onWeightChange={createWeightChangeHandler(set, i)}
              />
            ))}
          <Button
            aria-label='Add Exercise'
            className={styles.plusButton}
            onClick={onAddSetClick}
            type='button'
            variant='none'
          >
            <Card className={styles.plus}>
              <Plus />
            </Card>
          </Button>
        </div>
      </Card>
    </Card>
  );
}
