import styles from './row.module.css';

type RowProps = {
  data: { name: string | null }[];
  index: number;
  style: object;
};

export const Row = ({ data, index, style }: RowProps) => (
  <li className={styles.container} style={style}>
    {typeof data[index].name === 'string'
      ? data[index].name.toLowerCase()
      : 'not specified'}
  </li>
);
