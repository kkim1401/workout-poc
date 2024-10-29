import { List } from '@/features/exercise/components';
import { getAllExercises } from '@/features/exercise/queries';
import { createClient } from '@/utils/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function ExercisesPage() {
  const queryClient = new QueryClient();
  const supabase = createClient();

  await prefetchQuery(queryClient, getAllExercises(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <List />
    </HydrationBoundary>
  );
}
