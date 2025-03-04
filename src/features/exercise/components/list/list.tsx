'use client';

import { Card } from '@/features/common/components';
import { Exercise } from '@/lib/api/db/exercises/types';
import clsx from 'clsx';
import { FixedSizeList } from 'react-window';
import styles from './list.module.css';
import { Row } from './row';

type ListProps = {
  className: string;
  exercises: Exercise[] | null;
};

export default function List({ className, exercises }: ListProps) {
  return (
    <section className={clsx(styles.container, className)}>
      {exercises && exercises.length > 0 && (
        <Card className={styles.card}>
          <h1 className={clsx('headline5', styles.title)}>Exercises</h1>
          <FixedSizeList
            className={styles.list}
            height={300}
            itemData={exercises}
            itemCount={exercises.length}
            itemSize={30}
            width={300}
          >
            {Row}
          </FixedSizeList>
        </Card>
      )}
    </section>
  );
}
