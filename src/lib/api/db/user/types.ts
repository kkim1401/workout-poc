import { TablesUpdate } from '@/lib/supabase/database-generated.types';
import { Tables, TablesInsert } from '@/lib/supabase/database.types';

export type ProfileDTO = Tables<'profiles'>;
export type ProfileInsertDTO = TablesInsert<'profiles'>;
export type ProfileUpdateDTO = TablesUpdate<'profiles'>;
