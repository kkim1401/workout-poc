import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import {
  getUserSetById as getUserSetByIdBase,
  getUserSetsByWorkoutId as getUserSetsByWorkoutIdBase,
} from './client';

export const getUserSetsByWorkoutId = cache(
  (...args: Parameters<typeof getUserSetsByWorkoutIdBase>) =>
    failSafely(getUserSetsByWorkoutIdBase(...args))
);

export const getUserSetById = cache(
  (...args: Parameters<typeof getUserSetByIdBase>) =>
    failSafely(getUserSetByIdBase(...args))
);
