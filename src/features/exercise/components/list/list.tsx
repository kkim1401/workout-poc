'use client';

import { Exercise } from '@/lib/api/db/exercises/types';
import { FixedSizeList } from 'react-window';

type RowProps = {
  data: { name: string | null }[];
  index: number;
  style: object;
};

const Row = ({ data, index, style }: RowProps) => (
  <div style={style}>{data[index % data.length].name}</div>
);

type ListProps = {
  exercises?: Exercise[];
};

export default function List({ exercises = [] }: ListProps) {
  return (
    <section>
      {exercises.length > 0 && (
        <FixedSizeList
          height={150}
          itemData={exercises}
          itemCount={exercises.length}
          itemSize={35}
          width={300}
        >
          {Row}
        </FixedSizeList>
      )}
    </section>
  );
}
