import { Tables } from '@/lib/supabase/database.types';

export type SetDTO = Tables<'sets'>;

export type Set = {
  id: string;
  workoutId: string;
  exerciseId: string;
  exerciseName: string;
  reps: number;
  repsAttempted: number | null;
  weight: number | null;
  weightAttempted: number | null;
  rpe: number | null;
};

export function mapSetDTOToSet(set: SetDTO): Set {
  return {
    id: set.id,
    workoutId: set.workout_id,
    exerciseId: set.exercise_id,
    exerciseName: set.exercise_name,
    reps: set.reps,
    repsAttempted: set.reps_attempted,
    weight: set.weight,
    weightAttempted: set.weight_attempted,
    rpe: set.rpe,
  };
}
