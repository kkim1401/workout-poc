import { type TypedSupabaseClient } from '@/lib/supabase/types';
import {
  mapWorkoutInstanceDTOToWorkoutInstance,
  mapWorkoutTemplateDTOToWorkoutTemplate,
} from '../types';

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
  workoutTemplateId: string
) => {
  const result = await client
    .from('workout_templates')
    .select('*')
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
    .select('*, set_instances(*), workout_templates(name, set_templates(*))')
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
    .select('*, workout_templates(name)')
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
