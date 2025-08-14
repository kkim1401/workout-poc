'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateWorkoutInstance(workoutInstanceId: string) {
  revalidatePath(`/workouts/instances/${workoutInstanceId}`);
}

export async function revalidateWorkoutTemplate(workoutTemplateId: string) {
  revalidatePath(`/workouts/templates/${workoutTemplateId}`);
}
