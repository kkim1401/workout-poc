import { Card, TextField } from '@/features/common/components';
import { Set } from '@/lib/api/db/sets/types';
import clsx from 'clsx';
import styles from './set-card.module.css';

type SetCardProps = {
  className: string;
  index: number;
  set: Partial<Set>;
};

export default function SetCard({ className, index, set }: SetCardProps) {
  return (
    <Card depth='shallow' className={clsx(styles.container, className)}>
      <span>Set {index + 1}</span>
      <TextField fixedSize={false} label='Weight' value={set.weight || ''} />
      <TextField fixedSize={false} label='Reps' value={set.reps || ''} />
    </Card>
  );
}
