import styles from './row.module.css';
import { ListItem } from './types';

type RowProps<T extends ListItem> = {
  data: T[];
  index: number;
  // eslint-disable-next-line no-unused-vars
  onClick?: (item: T) => void;
  style: object;
};

export default function Row<T extends ListItem>({
  data,
  index,
  onClick = () => {},
  style,
}: RowProps<T>) {
  return (
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
}
