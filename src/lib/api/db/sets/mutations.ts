import { TypedSupabaseClient } from '@/lib/supabase/types';
import { SetInstanceInputDTO } from './types';

export const createSetInstance = async (
  client: TypedSupabaseClient,
  setInstance: SetInstanceInputDTO
) => {
  const result = await client
    .from('set_instances')
    .insert(setInstance)
    .select('id')
    .single();

  if (result.error) {
    throw result.error;
  }

  return result.data;
};
