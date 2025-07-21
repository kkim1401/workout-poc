import { getUserSetTemplateById } from '@/lib/api/db/sets/queries/server';
import { getUser } from '@/lib/api/db/user/queries/server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SetPage({
  params,
}: {
  params: Promise<{ workoutTemplateId: string; setId: string }>;
}) {
  const { workoutTemplateId, setId } = await params;
  const supabase = await createClient();

  const { data: user } = await getUser(supabase);
  const { data: setTemplate } = await getUserSetTemplateById(supabase, setId);

  if (!user) {
    redirect('/login');
  }

  return (
    <section>
      <h1>Set Details</h1>
      <p>Workout ID: {workoutTemplateId}</p>
      <p>Set ID: {setTemplate?.id}</p>
      <p>Exercise Target: {setTemplate?.exerciseName}</p>
      <p>Reps Target: {setTemplate?.repsTarget}</p>
      <p>Weight Target: {setTemplate?.weightTarget}</p>
      <p>RPE Target: {setTemplate?.rpeTarget}</p>
    </section>
  );
}
