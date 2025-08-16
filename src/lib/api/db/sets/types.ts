import { TablesUpdate } from '@/lib/supabase/database-generated.types';
import { Tables, TablesInsert } from '@/lib/supabase/database.types';
import { ExerciseOutputDTO } from '../exercises/types';

export type SetTemplateOutputDTO = Tables<'set_templates'> & {
  exercises?: {
    name: ExerciseOutputDTO['name'];
  } | null;
};

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
  set: SetTemplateOutputDTO
): SetTemplate {
  return {
    id: set.id,
    workoutTemplateId: set.workout_template_id,
    exerciseId: set.exercise_id,
    exerciseName: set.exercises?.name || '',
    repsTarget: set.reps_target,
    weightTarget: set.weight_target,
    rpeTarget: set.rpe_target,
  };
}

export type SetInstanceOutputDTO = Tables<'set_instances'> & {
  exercises?: {
    name: ExerciseOutputDTO['name'];
  } | null;
};
export type SetInstanceInputDTO = TablesInsert<'set_instances'>;
export type SetInstanceUpdateDTO = TablesUpdate<'set_instances'>;

export type SetInstance = {
  id: string;
  orderInWorkout: number;
  exerciseId: string;
  exerciseName: string;
  workoutInstanceId: string;
  setTemplateId: string | null;
  repsCompleted: number | null;
  weightUsed: number | null;
  completedAt: string | null;
};

export function mapSetInstanceDTOToSetInstance(
  set: SetInstanceOutputDTO
): SetInstance {
  return {
    id: set.id,
    orderInWorkout: set.order_in_workout,
    exerciseId: set.exercise_id,
    exerciseName: set.exercises?.name || '',
    workoutInstanceId: set.workout_instance_id,
    setTemplateId: set.set_template_id,
    repsCompleted: set.reps_actual,
    weightUsed: set.weight_actual,
    completedAt: set.completed_at,
  };
}
