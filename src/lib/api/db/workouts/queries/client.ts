import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { mapWorkoutTemplateDTOToWorkoutTemplate } from '../types';

export const getAllUserWorkoutTemplates = async (
  client: TypedSupabaseClient
) => {
  const result = await client.from('workout_templates').select('*');

  if (result.error) {
    throw result.error;
  }

  return result.data.map(mapWorkoutTemplateDTOToWorkoutTemplate);
};
getAllUserWorkoutTemplates.getQueryKey = () => ['getAllUserWorkoutTemplates'];

export const getUserWorkoutTemplateById = async (
  client: TypedSupabaseClient,
  workoutId: string
) => {
  const result = await client
    .from('workout_templates')
    .select('*')
    .eq('id', workoutId)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutTemplateDTOToWorkoutTemplate(result.data);
};
getUserWorkoutTemplateById.getQueryKey = (workoutId: string) => [
  'getUserWorkoutTemplateById',
  { workoutId },
];
