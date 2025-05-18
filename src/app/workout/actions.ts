'use server';

import { WorkoutExercise } from '@/features/workout/types';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
});

/** Look up if server action is necessary for client-side form submission */
/* To answer the above, it's possible to have a hybrid approach where the onSubmit
 * does simple validations, and the action performs the server-side submission.
 */
export async function createWorkout(
  _prevState: unknown,
  formData: FormData
): Promise<{ fieldErrors?: { title?: string[] }; message?: string } | void> {
  const rawFormData = Object.fromEntries(formData);
  const validatedFields = schema.safeParse(rawFormData);
  const workoutExercises: WorkoutExercise[] = JSON.parse(
    rawFormData.workoutExercises as string
  );

  if (!validatedFields.success) {
    return validatedFields.error.flatten();
  }

  const supabase = await createClient();

  // Need to do this in an atomic transaction
  workoutExercises.forEach((workoutExercise) => {
    workoutExercise.sets.forEach((set) => {
      supabase.from('sets').insert(set);
    });
  });

  // Might want to revalidate workout view
  console.log({
    workoutExercises,
    sets: workoutExercises[0].sets,
    validatedFields,
  });
}
