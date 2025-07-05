import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import { getAllUserExercises as getAllUserExercisesBase } from './client';

export const getAllUserExercises = cache(
  (...args: Parameters<typeof getAllUserExercisesBase>) =>
    failSafely(getAllUserExercisesBase(...args))
);
