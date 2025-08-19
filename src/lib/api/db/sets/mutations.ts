import { TypedSupabaseClient } from '@/lib/supabase/types';
import { SET_INSTANCE_BASE_SELECT } from './selectors';
import { SetInstanceInputDTO, SetInstanceUpdateDTO } from './types';

export const createSetInstance = async (
  client: TypedSupabaseClient,
  setInstance: SetInstanceInputDTO
) => {
  const result = await client
    .from('set_instances')
    .insert(setInstance)
    .select(SET_INSTANCE_BASE_SELECT)
    .single();

  if (result.error) {
    throw result.error;
  }

  return result.data;
};

export const updateSetInstance = async (
  client: TypedSupabaseClient,
  setInstance: SetInstanceUpdateDTO
) => {
  if (!setInstance?.id) return null;

  const result = await client
    .from('set_instances')
    .update(setInstance)
    .eq('id', setInstance.id)
    .select(SET_INSTANCE_BASE_SELECT)
    .single();

  if (result.error) {
    throw result.error;
  }

  return result.data;
};
