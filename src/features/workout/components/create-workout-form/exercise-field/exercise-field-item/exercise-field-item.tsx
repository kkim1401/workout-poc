import { Button, Card } from '@/features/common/components';
import { Plus } from 'lucide-react';
import { useFieldArray, useWatch } from 'react-hook-form';
import styles from './exercise-field-item.module.css';
import { SetCard } from './set-card';

type ExerciseFieldItemProps = {
  exerciseIndex: number;
};

export default function ExerciseFieldItem({
  exerciseIndex,
}: ExerciseFieldItemProps) {
  const { fields, append } = useFieldArray({
    name: `workout_exercises.${exerciseIndex}.sets`,
  });

  const exerciseName = useWatch({
    name: `workout_exercises.${exerciseIndex}.exercise_name`,
  });

  return (
    <Card depth='shallow' as='details' open className={styles.container}>
      <summary>{exerciseName}</summary>
      <Card depth='shallow' className={styles.sets} as='section'>
        <p className='subtitle1'>Sets</p>
        <div className={styles.setItems}>
          {fields.map((field, index) => {
            return (
              <SetCard
                className={styles.setCard}
                exerciseIndex={exerciseIndex}
                index={index}
                key={field.id}
              />
            );
          })}
          <Button
            aria-label='Add Set'
            className={styles.plusButton}
            onClick={() => {
              append({ exercise_name: exerciseName });
            }}
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
