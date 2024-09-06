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
      <div
        className={concatClasses(styles.marker, completed && styles.completed)}
      >
        {number}
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.setCount}>{setCount}</p>
      <p className={styles.date}>{formattedDate}</p>
    </li>
  );
}

function ListItemMarker() {}
