'use client';

import { FixedSizeList } from 'react-window';

const exercises = [
  { name: 'squat' },
  { name: 'bench press' },
  { name: 'deadlift' },
];

type RowProps = {
  data: { name: string }[];
  index: number;
  style: object;
};

const Row = ({ data, index, style }: RowProps) => (
  <div style={style}>{data[index % data.length].name}</div>
);

export default function List() {
  return (
    <FixedSizeList
      height={150}
      itemData={exercises}
      itemCount={100}
      itemSize={35}
      width={300}
    >
      {Row}
    </FixedSizeList>
  );
}
