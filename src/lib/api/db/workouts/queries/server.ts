import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import {
  getAllUserWorkouts as getAllUserWorkoutsBase,
  getUserWorkoutById as getWorkoutByIdBase,
} from './client';

export const getAllUserWorkouts = cache(
  (...args: Parameters<typeof getAllUserWorkoutsBase>) =>
    failSafely(getAllUserWorkoutsBase(...args))
);

export const getUserWorkoutById = cache(
  (...args: Parameters<typeof getWorkoutByIdBase>) =>
    failSafely(getWorkoutByIdBase(...args))
);
