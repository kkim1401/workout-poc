import { List } from '@/features/exercise/components';
import { getAllExercises, getUser } from '@/lib/api';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ExercisesPage() {
  const supabase = await createClient();

  const user = await getUser(supabase);

  if (!user) {
    redirect('/login');
  }

  const exercises = await getAllExercises(supabase);

  return <List exercises={exercises} />;
}
