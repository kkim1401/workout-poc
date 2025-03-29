import { cache } from 'react';
import { getAllUserExercises as getAllUserExercisesBase } from './client';

export const getAllUserExercises = cache(getAllUserExercisesBase);
