import { cache } from 'react';
import { getAllUserWorkouts as getAllUserWorkoutsBase } from './client';

export const getAllUserWorkouts = cache(getAllUserWorkoutsBase);
