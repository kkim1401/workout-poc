import { Card, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { get } from 'lodash-es';
import { useFormContext } from 'react-hook-form';
import styles from './set-card.module.css';

type SetCardProps = {
  className: string;
  exerciseIndex: number;
  index: number;
};

export default function SetCard({
  className,
  exerciseIndex,
  index,
}: SetCardProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const weightError = get(
    errors,
    `workout_exercises.${exerciseIndex}.sets.${index}.weight.message`
  ) as string | undefined;

  const repsError = get(
    errors,
    `workout_exercises.${exerciseIndex}.sets.${index}.reps.message`
  ) as string | undefined;

  return (
    <Card depth='shallow' className={clsx(styles.container, className)}>
      <span>Set {index + 1}</span>
      <TextField
        className={styles.weightInput}
        type='number'
        label='Weight'
        {...register(
          `workout_exercises.${exerciseIndex}.sets.${index}.weight`,
          {
            valueAsNumber: true,
          }
        )}
        error={weightError}
      />
      <TextField
        className={styles.repsInput}
        type='number'
        label='Reps'
        {...register(`workout_exercises.${exerciseIndex}.sets.${index}.reps`, {
          valueAsNumber: true,
        })}
        error={repsError}
      />
    </Card>
  );
}
