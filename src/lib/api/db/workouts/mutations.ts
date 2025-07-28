import { TypedSupabaseClient } from '@/lib/supabase/types';
import { WorkoutInstanceInsertDTO } from './types';

export const createWorkoutInstance = (
  client: TypedSupabaseClient,
  workoutInstance: WorkoutInstanceInsertDTO
) => {
  return client.from('workout_instances').insert(workoutInstance);
};
