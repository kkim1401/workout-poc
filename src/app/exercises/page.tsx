import { List } from '@/features/exercise/components';
import { getAllExercises } from '@/lib/api/db/exercises/queries';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ExercisesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  const exercises = await getAllExercises(supabase);

  return <List exercises={exercises} />;
}
