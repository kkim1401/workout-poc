import { Button, TextField } from '@/features/common/components';
import { SetSchema } from '@/features/workout/schemas';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import styles from './field.module.css';

export type FieldProps = SetSchema & {
  className?: string;
  id: string;
  index: number;
  isEditing?: boolean;
  // eslint-disable-next-line no-unused-vars
  onDelete?: (id: string) => void;
};

export default function Field({
  className,
  id,
  index,
  isEditing = false,
  reps_actual,
  reps_target,
  weight_actual,
  weight_target,
}: FieldProps) {
  const { register } = useFormContext();
  return (
    <div key={id} className={clsx(styles.container, className)}>
      <div className={styles.fieldHeader}>
        <p className={clsx('subtitle2', styles.fieldLabel)}>Set {index + 1}</p>
        {isEditing && (
          <Button variant='none' className={styles.removeButton}>
            <X height={16} />
          </Button>
        )}
      </div>
      <p>
        Target: {weight_target}lbs x {reps_target} reps
      </p>
      <div className={styles.setItem}>
        <TextField
          defaultValue={weight_actual || ''}
          label='Weight'
          type='number'
          {...register(`sets.${index}.weight_actual`, { valueAsNumber: true })}
          className={styles.weightInput}
        />
        <TextField
          defaultValue={reps_actual || ''}
          label='Reps'
          type='number'
          {...register(`sets.${index}.reps_actual`, { valueAsNumber: true })}
          className={styles.repsInput}
        />
      </div>
    </div>
  );
}
