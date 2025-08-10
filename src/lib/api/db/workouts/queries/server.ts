import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import {
  getActiveUserWorkoutInstanceByWorkoutTemplateId as getActiveUserWorkoutInstanceByWorkoutTemplateIdBase,
  getAllUserWorkoutTemplates as getAllUserWorkoutTemplatesBase,
  getUserWorkoutInstanceById as getUserWorkoutInstanceByIdBase,
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

export const getActiveUserWorkoutInstanceByWorkoutTemplateId = cache(
  (
    ...args: Parameters<
      typeof getActiveUserWorkoutInstanceByWorkoutTemplateIdBase
    >
  ) => failSafely(getActiveUserWorkoutInstanceByWorkoutTemplateIdBase(...args))
);

export const getUserWorkoutInstanceById = cache(
  (...args: Parameters<typeof getUserWorkoutInstanceByIdBase>) =>
    failSafely(getUserWorkoutInstanceByIdBase(...args))
);
