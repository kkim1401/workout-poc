import { type TypedSupabaseClient } from '@/lib/supabase/types';
import { SET_INSTANCE_SELECT, SET_TEMPLATE_SELECT } from '../selectors';
import { mapSetTemplateDTOToSetTemplate } from '../types';

// Set Template Queries
export const getUserSetTemplatesByWorkoutTemplateId = async (
  client: TypedSupabaseClient,
  workoutId: string
) => {
  const result = await client
    .from('set_templates')
    .select(SET_TEMPLATE_SELECT)
    .eq('workout_template_id', workoutId);

  if (result.error) {
    throw result.error;
  }

  return result.data.map(mapSetTemplateDTOToSetTemplate);
};
getUserSetTemplatesByWorkoutTemplateId.getQueryKey = (workoutId: string) => [
  'getUserSetTemplatesByWorkoutTemplateId',
  { workoutId },
];

export const getUserSetTemplateById = async (
  client: TypedSupabaseClient,
  setId: string
) => {
  const result = await client
    .from('set_templates')
    .select(SET_TEMPLATE_SELECT)
    .eq('id', setId)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapSetTemplateDTOToSetTemplate(result.data);
};
getUserSetTemplateById.getQueryKey = (setId: string) => [
  'getUserSetTemplateById',
  { setId },
];

// Set Instance Queries
export const getUserSetInstancesByWorkoutTemplateId = (
  client: TypedSupabaseClient,
  workoutId: string
) => {
  return client
    .from('set_instances')
    .select(SET_INSTANCE_SELECT)
    .eq('workout_template_id', workoutId);
};
getUserSetInstancesByWorkoutTemplateId.getQueryKey = (workoutId: string) => [
  'getUserSetInstancesByWorkoutTemplateId',
  { workoutId },
];

export const getUserSetInstanceById = (
  client: TypedSupabaseClient,
  setInstanceId: string
) => {
  return client
    .from('set_instances')
    .select(SET_INSTANCE_SELECT)
    .eq('id', setInstanceId)
    .single();
};
