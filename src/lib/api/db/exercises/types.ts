import { Tables } from '@/lib/supabase/database.types';

export type ExerciseOutputDTO = Tables<'user_visible_exercises'>;

export type Exercise = {
  id: string;
  name: string;
};

export function mapExerciseDTOToExercise(
  exercise: ExerciseOutputDTO
): Exercise {
  return {
    id: exercise.id,
    name: exercise.name,
  };
}
