// Workout localStorage utility functions

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
