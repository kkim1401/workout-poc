import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { mapExerciseDTOToExercise } from '../types';

export const getAllUserExercises = async (client: TypedSupabaseClient) => {
  const result = await client.from('user_visible_exercises').select('*');
  if (result.error) {
    throw result.error;
  }
  return result.data.map(mapExerciseDTOToExercise);
};
getAllUserExercises.getQueryKey = () => ['getAllUserExercises'];
