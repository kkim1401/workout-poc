'use client';

import { useSupabaseBrowser } from '@/utils/supabase/client';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { FixedSizeList } from 'react-window';
import { getAllExercises } from '../../queries';

type RowProps = {
  data: { name: string | null }[];
  index: number;
  style: object;
};

const Row = ({ data, index, style }: RowProps) => (
  <div style={style}>{data[index % data.length].name}</div>
);

export default function List() {
  const supabase = useSupabaseBrowser();

  const { data: exercises } = useQuery(getAllExercises(supabase));

  return (
    <section>
      {exercises && (
        <FixedSizeList
          height={150}
          itemData={exercises}
          itemCount={100}
          itemSize={35}
          width={300}
        >
          {Row}
        </FixedSizeList>
      )}
    </section>
  );
}
