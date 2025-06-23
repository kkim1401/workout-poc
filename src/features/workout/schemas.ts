import { z } from 'zod/v4';

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
  title: z.string().min(1, 'Title is required'),
  workoutExercises: z
    .array(workoutExerciseSchema)
    .min(1, 'At least one exercise is required'),
});

export type WorkoutExerciseSetSchema = z.infer<typeof workoutExerciseSetSchema>;
export type WorkoutExerciseSchema = z.infer<typeof workoutExerciseSchema>;
export type CreateWorkoutSchema = z.infer<typeof createWorkoutSchema>;
