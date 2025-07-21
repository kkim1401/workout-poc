import { Tables } from '@/lib/supabase/database.types';

export type SetTemplateDTO = Tables<'set_templates'>;

export type SetTemplate = {
  id: string;
  workoutTemplateId: string;
  exerciseId: string;
  exerciseName: string;
  repsTarget: number;
  weightTarget: number | null;
  rpeTarget: number | null;
};

export function mapSetTemplateDTOToSetTemplate(
  set: SetTemplateDTO
): SetTemplate {
  return {
    id: set.id,
    workoutTemplateId: set.workout_template_id,
    exerciseId: set.exercise_id,
    exerciseName: set.exercise_name,
    repsTarget: set.reps_target,
    weightTarget: set.weight_target,
    rpeTarget: set.rpe_target,
  };
}
