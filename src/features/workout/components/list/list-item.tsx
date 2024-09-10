'use client';
import { concatClasses } from '@/utils';
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
          className={concatClasses(
            'subtitle2',
            styles.marker,
            completed && styles.completed
          )}
        >
          {number}
        </div>
        <div className={styles.info}>
          <p className={concatClasses('subtitle2', styles.name)}>{name}</p>
          <p className={concatClasses('body2', styles.setCount)}>
            {setCount} sets
          </p>
        </div>
      </div>
      <p className={concatClasses('subtitle2', styles.date)}>{formattedDate}</p>
    </li>
  );
}
