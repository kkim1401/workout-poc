import { Exercise } from '@/lib/api/db/exercises/types';
import { Set } from '@/lib/api/db/sets/types';

export type WorkoutExerciseSet = Partial<Set> & {
  exercise_name: string;
};

/**
 * When getting workout, the UI will get a list of sets, ordered by when they should
 * be done. UI will group them by exercise.
 * WorkoutExercise is a UI model representing the group, containing the exercise metadata (just name in this case)
 * and sets.
 */
export type WorkoutExercise = {
  exercise_id: Exercise['id'];
  exercise_name: NonNullable<Exercise['name']>;
  sets: WorkoutExerciseSet[];
};
