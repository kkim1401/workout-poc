import { TypedSupabaseClient } from '@/lib/supabase/types';
import { WorkoutInstanceInputDTO } from './types';

export const createWorkoutInstance = async (
  client: TypedSupabaseClient,
  workoutInstance: WorkoutInstanceInputDTO
) => {
  const result = await client
    .from('workout_instances')
    .insert(workoutInstance)
    .select()
    .single();

  if (result.error) {
    throw result.error;
  }

  return result.data;
};
