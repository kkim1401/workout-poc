import { Exercise } from '@/lib/api/db/exercises/types';
import styles from './row.module.css';

type RowProps = {
  data: Exercise[];
  index: number;
  // eslint-disable-next-line no-unused-vars
  onClick: (exercise: Exercise) => void;
  style: object;
};

export const Row = ({ data, index, onClick, style }: RowProps) => (
  <li
    className={styles.container}
    style={style}
    onClick={() => onClick(data[index])}
  >
    {typeof data[index].name === 'string'
      ? data[index].name.toLowerCase()
      : 'not specified'}
  </li>
);
