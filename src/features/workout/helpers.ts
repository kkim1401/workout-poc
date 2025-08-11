import { SetInstance, SetTemplate } from '@/lib/api/db/sets/types';
import { WorkoutInstance } from '@/lib/api/db/workouts/types';

const ACTIVE_WORKOUT_ID_KEY = 'activeWorkoutId';
const WORKOUT_START_TIME_KEY = 'workoutStartTime';

export const setActiveWorkout = (workoutId: string, startTime: number) => {
  localStorage.setItem(ACTIVE_WORKOUT_ID_KEY, workoutId);
  localStorage.setItem(WORKOUT_START_TIME_KEY, startTime.toString());
};

export const getActiveWorkout = () => {
  const workoutId = localStorage.getItem(ACTIVE_WORKOUT_ID_KEY);
  const startTimeStr = localStorage.getItem(WORKOUT_START_TIME_KEY);
  const startTime = startTimeStr ? parseInt(startTimeStr) : null;

  return {
    workoutId,
    startTime,
  };
};

export const removeActiveWorkout = () => {
  localStorage.removeItem(ACTIVE_WORKOUT_ID_KEY);
  localStorage.removeItem(WORKOUT_START_TIME_KEY);
};

export const hasActiveWorkout = () => {
  return localStorage.getItem(ACTIVE_WORKOUT_ID_KEY) !== null;
};

export const groupSetTemplatesByExercise = (setTemplates: SetTemplate[]) => {
  return setTemplates.reduce(
    (acc, setTemplate) => {
      const { exerciseId, exerciseName } = setTemplate;
      if (!acc[exerciseId]) {
        acc[exerciseId] = {
          id: exerciseId,
          exerciseName,
          setTemplates: [],
        };
      }
      acc[exerciseId].setTemplates.push(setTemplate);
      return acc;
    },
    {} as Record<
      string,
      { id: string; exerciseName: string; setTemplates: SetTemplate[] }
    >
  );
};

export const groupSetsByExercise = (workoutInstance: WorkoutInstance) => {
  const setTemplates = workoutInstance.setTemplates || [];
  const setInstances = workoutInstance.setInstances || [];

  // Start with grouped templates
  const templatesGrouped = groupSetTemplatesByExercise(setTemplates);

  // Convert to the extended format with setInstances
  const grouped = Object.entries(templatesGrouped).reduce(
    (acc, [exerciseId, exercise]) => {
      acc[exerciseId] = {
        ...exercise,
        setInstances: [],
      };
      return acc;
    },
    {} as Record<
      string,
      {
        id: string;
        exerciseName: string;
        setTemplates: SetTemplate[];
        setInstances: SetInstance[];
      }
    >
  );

  // Add setInstances to their corresponding exercises
  setInstances.forEach((setInstance) => {
    // Find the exercise this set instance belongs to by matching setTemplateId
    const exerciseId = setTemplates.find(
      (st) => st.id === setInstance.setTemplateId
    )?.exerciseId;
    if (exerciseId && grouped[exerciseId]) {
      grouped[exerciseId].setInstances.push(setInstance);
    }
  });

  return grouped;
};

export const getExerciseByIndexFromWorkoutInstance = (
  workoutInstance: WorkoutInstance,
  index: number
) => {
  const exercises = groupSetsByExercise(workoutInstance);
  const exerciseKeys = Object.keys(exercises);
  if (index < 0 || index >= exerciseKeys.length) {
    return null;
  }
  return exercises[exerciseKeys[index]];
};
