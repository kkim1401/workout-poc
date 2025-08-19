import { TypedSupabaseClient } from '@/lib/supabase/types';
import { WORKOUT_INSTANCE_BASE_SELECT } from './selectors';
import {
  mapWorkoutInstanceDTOToWorkoutInstance,
  WorkoutInstanceInputDTO,
  WorkoutInstanceUpdateDTO,
} from './types';

export const createWorkoutInstance = async (
  client: TypedSupabaseClient,
  workoutInstance: WorkoutInstanceInputDTO
) => {
  const result = await client
    .from('workout_instances')
    .insert(workoutInstance)
    .select(WORKOUT_INSTANCE_BASE_SELECT)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutInstanceDTOToWorkoutInstance(result.data);
};

export const updateWorkoutInstance = async (
  client: TypedSupabaseClient,
  workoutInstance: WorkoutInstanceUpdateDTO
) => {
  if (!workoutInstance?.id) return null;

  const result = await client
    .from('workout_instances')
    .update(workoutInstance)
    .eq('id', workoutInstance.id)
    .select(WORKOUT_INSTANCE_BASE_SELECT)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutInstanceDTOToWorkoutInstance(result.data);
};
