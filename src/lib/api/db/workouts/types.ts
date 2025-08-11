import { Tables, TablesInsert } from '@/lib/supabase/database.types';
import {
  mapSetInstanceDTOToSetInstance,
  mapSetTemplateDTOToSetTemplate,
  SetInstance,
  SetInstanceOutputDTO,
  SetTemplate,
  SetTemplateOutputDTO,
} from '../sets/types';

export type WorkoutTemplateOutputDTO = Tables<'workout_templates'>;

export type WorkoutTemplate = {
  id: string;
  name: string;
};

export function mapWorkoutTemplateDTOToWorkoutTemplate(
  workout: WorkoutTemplateOutputDTO
): WorkoutTemplate {
  return {
    id: workout.id,
    name: workout.name,
  };
}

export type WorkoutInstanceOutputDTO = Tables<'workout_instances'> & {
  workout_templates: {
    name: WorkoutTemplateOutputDTO['name'];
    set_templates: SetTemplateOutputDTO[] | null;
  } | null;
  set_instances: SetInstanceOutputDTO[] | null;
};
export type WorkoutInstanceInputDTO = TablesInsert<'workout_instances'>;

export type WorkoutInstance = {
  id: string;
  name: string;
  workoutTemplateId: string;
  userId: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  setInstances: SetInstance[] | null;
  setTemplates: SetTemplate[] | null;
};

export function mapWorkoutInstanceDTOToWorkoutInstance(
  workout: WorkoutInstanceOutputDTO
): WorkoutInstance {
  return {
    id: workout.id,
    name: workout?.workout_templates?.name || '',
    workoutTemplateId: workout.workout_template_id,
    userId: workout.user_id,
    createdAt: workout.created_at,
    startedAt: workout.started_at,
    completedAt: workout.completed_at,
    setInstances: workout.set_instances
      ? workout.set_instances.map(mapSetInstanceDTOToSetInstance)
      : null,
    setTemplates: workout.workout_templates?.set_templates
      ? workout.workout_templates.set_templates.map(
          mapSetTemplateDTOToSetTemplate
        )
      : null,
  };
}
