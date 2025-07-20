import { getUserSetById } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SetPage({
  params,
}: {
  params: Promise<{ workoutId: string; setId: string }>;
}) {
  const { workoutId, setId } = await params;
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);
  const { data: set } = await getUserSetById(supabase, setId);

  if (!user) {
    redirect('/login');
  }

  return (
    <section>
      <h1>Set Details</h1>
      <p>Workout ID: {workoutId}</p>
      <p>Set ID: {set?.id}</p>
      <p>Exercise: {set?.exerciseName}</p>
      <p>Reps: {set?.reps}</p>
      <p>Weight: {set?.weight}</p>
      <p>RPE: {set?.rpe}</p>
      <p>Reps Attempted: {set?.repsAttempted}</p>
      <p>Weight Attempted: {set?.weightAttempted}</p>
    </section>
  );
}
