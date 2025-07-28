import { TypedSupabaseClient } from '@/lib/supabase/types';
import {
  mapWorkoutInstanceDTOToWorkoutInstance,
  WorkoutInstanceInsertDTO,
} from './types';

export const createWorkoutInstance = async (
  client: TypedSupabaseClient,
  workoutInstance: WorkoutInstanceInsertDTO
) => {
  const result = await client
    .from('workout_instances')
    .insert(workoutInstance)
    .select()
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutInstanceDTOToWorkoutInstance(result.data);
};
