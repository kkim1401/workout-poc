import { Button, Card } from '@/features/common/components';
import { Exercise } from '@/lib/api/db/exercises/types';
import { Set } from '@/lib/api/db/sets/types';
import { Plus } from 'lucide-react';
import styles from './exercises-field-item.module.css';
import { SetCard } from './set-card';

type ExercisesFieldItemProps = {
  exerciseName: Exercise['name'];
  onAddSetClick: () => void;
  sets?: Partial<Set>[];
};

export default function ExercisesFieldItem({
  exerciseName,
  onAddSetClick,
  sets,
}: ExercisesFieldItemProps) {
  return (
    <Card depth='shallow' as='details' className={styles.container}>
      <summary>{exerciseName}</summary>
      <Card depth='shallow' className={styles.sets} as='section'>
        <p className='subtitle1'>Sets</p>
        <div className={styles.setItems}>
          {sets &&
            sets.length > 0 &&
            sets.map((set, i) => (
              <SetCard className={styles.setItem} key={i} set={set} index={i} />
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
