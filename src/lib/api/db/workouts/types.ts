import { Tables } from '@/lib/supabase/database.types';

export type WorkoutDTO = Tables<'workouts'>;

export type Workout = {
  id: string;
  name: string;
};

export function mapWorkoutDTOToWorkout(workout: WorkoutDTO): Workout {
  return {
    id: workout.id,
    name: workout.name,
  };
}
