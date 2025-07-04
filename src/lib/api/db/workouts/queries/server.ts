import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import {
  getAllUserWorkouts as getAllUserWorkoutsBase,
  getWorkoutById as getWorkoutByIdBase,
} from './client';

export const getAllUserWorkouts = cache(
  (...args: Parameters<typeof getAllUserWorkoutsBase>) =>
    failSafely(getAllUserWorkoutsBase(...args))
);

export const getWorkoutById = cache(
  (...args: Parameters<typeof getWorkoutByIdBase>) =>
    failSafely(getWorkoutByIdBase(...args))
);
