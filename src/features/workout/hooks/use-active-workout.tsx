import { useCallback, useEffect, useState } from 'react';
import {
  getActiveWorkout,
  removeActiveWorkout,
  setActiveWorkout,
} from '../helpers';

const useActiveWorkout = (expirationHours = 12) => {
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);

  // Check if workout has expired
  const isWorkoutExpired = useCallback(
    (startTime: number) => {
      if (!startTime) return false;
      const expirationMs = expirationHours * 60 * 60 * 1000; // Convert hours to milliseconds
      return Date.now() - startTime > expirationMs;
    },
    [expirationHours]
  );

  // Clear expired workout data
  const clearExpiredWorkout = useCallback(() => {
    setActiveWorkoutId(null);
    setWorkoutStartTime(null);
    removeActiveWorkout();
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const { workoutId, startTime } = getActiveWorkout();

    if (workoutId && startTime) {
      // Check if workout has expired
      if (isWorkoutExpired(startTime)) {
        clearExpiredWorkout();
      } else {
        setActiveWorkoutId(workoutId);
        setWorkoutStartTime(startTime);
      }
    }
  }, [isWorkoutExpired, clearExpiredWorkout]);

  // Start a new workout
  const startWorkout = useCallback((workoutId: string) => {
    const startTime = Date.now();

    setActiveWorkoutId(workoutId);
    setWorkoutStartTime(startTime);

    setActiveWorkout(workoutId, startTime);
  }, []);

  // End the current workout
  const endWorkout = useCallback(() => {
    setActiveWorkoutId(null);
    setWorkoutStartTime(null);

    removeActiveWorkout();
  }, []);

  // Check and handle expiration (can be called manually)
  const checkExpiration = useCallback(() => {
    if (workoutStartTime && isWorkoutExpired(workoutStartTime)) {
      clearExpiredWorkout();
      return true; // Workout was expired and cleared
    }
    return false; // Workout is still valid
  }, [workoutStartTime, isWorkoutExpired, clearExpiredWorkout]);

  // Computed values
  const isWorkoutActive = activeWorkoutId !== null;
  const workoutDuration = workoutStartTime ? Date.now() - workoutStartTime : 0;
  const timeUntilExpiration = workoutStartTime
    ? Math.max(0, expirationHours * 60 * 60 * 1000 - workoutDuration)
    : 0;

  return {
    activeWorkoutId,
    workoutStartTime,
    isWorkoutActive,
    workoutDuration,
    timeUntilExpiration,
    startWorkout,
    endWorkout,
    checkExpiration,
  };
};

export default useActiveWorkout;
