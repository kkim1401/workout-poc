import { failSafely } from '@/lib/utils';
import { cache } from 'react';
import {
  getUserSetTemplateById as getUserSetTemplateByIdBase,
  getUserSetTemplatesByWorkoutTemplateId as getUserSetTemplatesByWorkoutTemplateIdBase,
} from './client';

export const getUserSetTemplatesByWorkoutTemplateId = cache(
  (...args: Parameters<typeof getUserSetTemplatesByWorkoutTemplateIdBase>) =>
    failSafely(getUserSetTemplatesByWorkoutTemplateIdBase(...args))
);

export const getUserSetTemplateById = cache(
  (...args: Parameters<typeof getUserSetTemplateByIdBase>) =>
    failSafely(getUserSetTemplateByIdBase(...args))
);
