'use client';

import clsx from 'clsx';
import styles from './list-item.module.css';

type ListItemProps = {
  completed: boolean;
  dateInISO: string;
  name: string;
  number: number;
  setCount: number;
};

export default function ListItem({
  completed,
  dateInISO,
  name,
  number,
  setCount,
}: ListItemProps) {
  const date = new Date(dateInISO);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
  return (
    <li className={styles.container}>
      <div className={styles.leftColumn}>
        <div
          className={clsx(
            'subtitle2',
            styles.marker,
            completed && styles.completed
          )}
        >
          {number}
        </div>
        <div className={styles.info}>
          <p className={clsx('subtitle2', styles.name)}>{name}</p>
          <p className={clsx('body2', styles.setCount)}>{setCount} sets</p>
        </div>
      </div>
      <p className={clsx('subtitle2', styles.date)}>{formattedDate}</p>
    </li>
  );
}
