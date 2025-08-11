import { type TypedSupabaseClient } from '@/lib/supabase/types';
import {
  WORKOUT_INSTANCE_SELECT,
  WORKOUT_TEMPLATE_BASE_SELECT,
} from '../selectors';
import {
  mapWorkoutInstanceDTOToWorkoutInstance,
  mapWorkoutTemplateDTOToWorkoutTemplate,
} from '../types';

export const getAllUserWorkoutTemplates = async (
  client: TypedSupabaseClient
) => {
  const result = await client
    .from('workout_templates')
    .select(WORKOUT_TEMPLATE_BASE_SELECT);

  if (result.error) {
    throw result.error;
  }

  return result.data.map(mapWorkoutTemplateDTOToWorkoutTemplate);
};
getAllUserWorkoutTemplates.getQueryKey = () => ['getAllUserWorkoutTemplates'];

export const getUserWorkoutTemplateById = async (
  client: TypedSupabaseClient,
  workoutTemplateId: string
) => {
  const result = await client
    .from('workout_templates')
    .select(WORKOUT_TEMPLATE_BASE_SELECT)
    .eq('id', workoutTemplateId)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutTemplateDTOToWorkoutTemplate(result.data);
};
getUserWorkoutTemplateById.getQueryKey = (workoutTemplateId: string) => [
  'getUserWorkoutTemplateById',
  { workoutTemplateId },
];

export const getUserWorkoutInstanceById = async (
  client: TypedSupabaseClient,
  workoutInstanceId: string
) => {
  const result = await client
    .from('workout_instances')
    .select(WORKOUT_INSTANCE_SELECT)
    .eq('id', workoutInstanceId)
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutInstanceDTOToWorkoutInstance(result.data);
};
getUserWorkoutInstanceById.getQueryKey = (workoutInstanceId: string) => [
  'getUserWorkoutInstanceById',
  { workoutInstanceId },
];

export const getActiveUserWorkoutInstanceByWorkoutTemplateId = async (
  client: TypedSupabaseClient,
  workoutTemplateId: string
) => {
  const result = await client
    .from('workout_instances')
    .select(WORKOUT_INSTANCE_SELECT)
    .eq('workout_template_id', workoutTemplateId)
    .is('completed_at', null)
    .order('created_at', { ascending: false })
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapWorkoutInstanceDTOToWorkoutInstance(result.data);
};
getActiveUserWorkoutInstanceByWorkoutTemplateId.getQueryKey = (
  workoutTemplateId: string
) => ['getActiveUserWorkoutInstanceByWorkoutTemplateId', { workoutTemplateId }];
