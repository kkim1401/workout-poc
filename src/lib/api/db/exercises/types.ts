import { Tables } from '@/lib/supabase/database.types';

export type ExerciseDTO = Tables<'user_visible_exercises'>;

export type Exercise = {
  id: string;
  name: string;
};

export function mapExerciseDTOToExercise(exercise: ExerciseDTO): Exercise {
  return {
    id: exercise.id,
    name: exercise.name,
  };
}
