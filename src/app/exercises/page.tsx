import { List } from '@/features/exercise/components';
import { getAllExercises } from '@/lib/api/db/exercises/queries';
import { createClient } from '@/lib/supabase/server';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function ExercisesPage() {
  const queryClient = new QueryClient();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  await prefetchQuery(queryClient, getAllExercises(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <List />
    </HydrationBoundary>
  );
}
