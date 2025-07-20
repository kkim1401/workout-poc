import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { mapWorkoutDTOToWorkout } from '../types';

export const getAllUserWorkouts = async (client: TypedSupabaseClient) => {
  const result = await client.from('workouts').select('*');

  if (result.error) {
    throw result.error;
  }

  return result.data.map(mapWorkoutDTOToWorkout);
};
getAllUserWorkouts.getQueryKey = () => ['getAllUserWorkouts'];

export const getUserWorkoutById = async (
  client: TypedSupabaseClient,
  workoutId: string
) => {
  const result = await client
    .from('workouts')
    .select('*')
    .eq('id', workoutId)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutDTOToWorkout(result.data);
};
getUserWorkoutById.getQueryKey = (workoutId: string) => [
  'getUserWorkoutById',
  { workoutId },
];
