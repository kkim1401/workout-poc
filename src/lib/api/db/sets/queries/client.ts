import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { mapSetDTOToSet } from '../types';

export const getUserSetsByWorkoutId = async (
  client: TypedSupabaseClient,
  workoutId: string
) => {
  const result = await client
    .from('sets')
    .select('*')
    .eq('workout_id', workoutId);

  if (result.error) {
    throw result.error;
  }

  return result.data.map(mapSetDTOToSet);
};
getUserSetsByWorkoutId.getQueryKey = (workoutId: string) => [
  'getUserSetsByWorkoutId',
  { workoutId },
];

export const getUserSetById = async (
  client: TypedSupabaseClient,
  setId: string
) => {
  const result = await client.from('sets').select('*').eq('id', setId).single();

  if (result.error) {
    throw result.error;
  }

  return mapSetDTOToSet(result.data);
};
getUserSetById.getQueryKey = (setId: string) => ['getUserSetById', { setId }];
