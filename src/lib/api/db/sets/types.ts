import { Tables, TablesInsert } from '@/lib/supabase/database.types';

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

export type SetInstanceDTO = Tables<'set_instances'>;
export type SetInstanceInsertDTO = TablesInsert<'set_instances'>;

export type SetInstance = {
  id: string;
  workoutInstanceId: string;
  setTemplateId: string | null;
  repsCompleted: number | null;
  weightUsed: number | null;
  completedAt: string | null;
};

export function mapSetInstanceDTOToSetInstance(
  set: SetInstanceDTO
): SetInstance {
  return {
    id: set.id,
    workoutInstanceId: set.workout_instance_id,
    setTemplateId: set.set_template_id,
    repsCompleted: set.reps_actual,
    weightUsed: set.weight_actual,
    completedAt: set.completed_at,
  };
}
