import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import {
  getAllUserWorkoutTemplates as getAllUserWorkoutTemplatesBase,
  getUserWorkoutTemplateById as getWorkoutByIdBase,
} from './client';

export const getAllUserWorkoutTemplates = cache(
  (...args: Parameters<typeof getAllUserWorkoutTemplatesBase>) =>
    failSafely(getAllUserWorkoutTemplatesBase(...args))
);

export const getUserWorkoutTemplateById = cache(
  (...args: Parameters<typeof getWorkoutByIdBase>) =>
    failSafely(getWorkoutByIdBase(...args))
);
