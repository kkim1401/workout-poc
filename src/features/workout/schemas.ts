import { z } from 'zod/v4';

/**
 * For creating a workout.
 * Coupled to supabase.rpc('create_workout', data).
 * Might be a way to decouple this from the RPC call,
 * but for now, this is the simplest way to ensure the data structure matches.
 */

const workoutExerciseSetSchema = z.strictObject({
  exercise_name: z.string().min(1, 'Exercise name is required'),
  reps: z
    .number('Reps must be a number')
    .int('Reps must be an integer')
    .positive('Reps must be positive'),
  weight: z.number('Weight must be a number').positive('Weight must positive'),
});

const workoutExerciseSchema = z.strictObject({
  exercise_id: z.string().min(1, 'Exercise ID is required'),
  exercise_name: z.string().min(1, 'Exercise name is required'),
  sets: z
    .array(workoutExerciseSetSchema)
    .min(1, 'At least one set is required for each exercise'),
});

export const createWorkoutSchema = z.strictObject({
  name: z.string().min(1, 'Name is required'),
  workout_exercises: z
    .array(workoutExerciseSchema)
    .min(1, 'At least one exercise is required'),
});
