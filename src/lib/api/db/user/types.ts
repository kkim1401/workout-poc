import { TablesUpdate } from '@/lib/supabase/database-generated.types';
import { Tables, TablesInsert } from '@/lib/supabase/database.types';

export type ProfileOutputDTO = Tables<'profiles'>;
export type ProfileInputDTO = TablesInsert<'profiles'>;
export type ProfileUpdateDTO = TablesUpdate<'profiles'>;
