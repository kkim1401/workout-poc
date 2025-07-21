import { Tables } from '@/lib/supabase/database.types';

export type WorkoutTemplateDTO = Tables<'workout_templates'>;

export type WorkoutTemplate = {
  id: string;
  name: string;
};

export function mapWorkoutTemplateDTOToWorkoutTemplate(
  workout: WorkoutTemplateDTO
): WorkoutTemplate {
  return {
    id: workout.id,
    name: workout.name,
  };
}
