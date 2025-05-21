import { Card, TextField } from '@/features/common/components';
import { Set } from '@/lib/api/db/sets/types';
import clsx from 'clsx';
import { ChangeEventHandler } from 'react';
import styles from './set-card.module.css';

type SetCardProps = {
  className: string;
  index: number;
  onRepsChange: ChangeEventHandler<HTMLInputElement>;
  onWeightChange: ChangeEventHandler<HTMLInputElement>;
  set: Partial<Set>;
};

export default function SetCard({
  className,
  index,
  onRepsChange,
  onWeightChange,
  set,
}: SetCardProps) {
  return (
    <Card depth='shallow' className={clsx(styles.container, className)}>
      <span>Set {index + 1}</span>
      <TextField
        type='number'
        label='Weight'
        defaultValue={set.weight ?? ''}
        onChange={onWeightChange}
      />
      <TextField
        type='number'
        label='Reps'
        defaultValue={set.reps ?? ''}
        onChange={onRepsChange}
      />
    </Card>
  );
}
