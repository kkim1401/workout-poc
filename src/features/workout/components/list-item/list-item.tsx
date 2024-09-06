'use client';
import { concatClasses } from '@/utils';
import styles from './list-item.module.css';

type ListItemProps = {
  completed: boolean;
  date: string;
  name: string;
  setCount: number;
};

export default function ListItem({
  completed,
  date,
  name,
  setCount,
}: ListItemProps) {
  return (
    <li>
      <div
        className={concatClasses(styles.number, completed && styles.completed)}
      />
      <p className={styles.name}>{name}</p>
      <p className={styles.setCount}>{setCount}</p>
      <p className={styles.date}>{date}</p>
    </li>
  );
}
