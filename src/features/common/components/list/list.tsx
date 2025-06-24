'use client';

import { clsx } from 'clsx';
import { FixedSizeList } from 'react-window';
import { Card } from '../card';
import styles from './list.module.css';
import Row from './row';
import { ListItem } from './types';

type ListProps<T extends ListItem> = {
  className?: string;
  items?: T[] | null;
  title?: string;
  // eslint-disable-next-line no-unused-vars
  onItemClick?: (item: T) => void;
};

export default function List<T extends ListItem>({
  className,
  title,
  items,
  onItemClick,
}: ListProps<T>) {
  return (
    <section className={clsx(styles.container, className)}>
      {items && items.length > 0 && (
        <Card className={styles.card}>
          {title && (
            <h1 className={clsx('headline5', styles.title)}>{title}</h1>
          )}
          <FixedSizeList
            className={styles.list}
            height={300}
            itemData={items}
            itemCount={items.length}
            itemSize={30}
            width={300}
          >
            {({ index, style, data }) => (
              <Row
                index={index}
                style={style}
                data={data}
                onClick={onItemClick}
              />
            )}
          </FixedSizeList>
        </Card>
      )}
    </section>
  );
}
