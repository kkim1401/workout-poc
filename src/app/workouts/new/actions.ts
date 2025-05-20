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

  /**
   * Need to validate workoutExercises for null reps/weight
   */

  const { data, error } = await supabase.rpc('create_workout', {
    name: validatedFields.data.title,
    workout_exercises: workoutExercises,
  });

  if (error) {
    return { message: error.message };
  }

  /**
   * Might want to revalidate workout view and/or redirect to workout view
   */
  console.log({
    data,
    error,
  });
}
