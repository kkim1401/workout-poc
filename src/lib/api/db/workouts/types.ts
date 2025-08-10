import { Tables, TablesInsert } from '@/lib/supabase/database.types';
import {
  mapSetInstanceDTOToSetInstance,
  mapSetTemplateDTOToSetTemplate,
  SetInstance,
  SetInstanceDTO,
  SetTemplate,
  SetTemplateDTO,
} from '../sets/types';

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

export type WorkoutInstanceDTO = Tables<'workout_instances'> & {
  workout_templates?: {
    name?: WorkoutTemplateDTO['name'] | null;
    set_templates?: SetTemplateDTO[];
  } | null;
  set_instances?: SetInstanceDTO[];
};
export type WorkoutInstanceInsertDTO = TablesInsert<'workout_instances'>;

export type WorkoutInstance = {
  id: string;
  name?: string | null;
  workoutTemplateId: string;
  userId: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  setInstances?: SetInstance[] | null;
  setTemplates?: SetTemplate[] | null;
};

export function mapWorkoutInstanceDTOToWorkoutInstance(
  workout: WorkoutInstanceDTO
): WorkoutInstance {
  return {
    id: workout.id,
    name: workout?.workout_templates?.name,
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
