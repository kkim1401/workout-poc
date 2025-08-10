import { TypedSupabaseClient } from '@/lib/supabase/types';
import { mapSetInstanceDTOToSetInstance, SetInstanceInsertDTO } from './types';

export const createSetInstance = async (
  client: TypedSupabaseClient,
  setInstance: SetInstanceInsertDTO
) => {
  console.log('Creating set instance:', setInstance);
  const result = await client
    .from('set_instances')
    .insert(setInstance)
    .select()
    .single();

  if (result.error) {
    throw result.error;
  }

  return mapSetInstanceDTOToSetInstance(result.data);
};
