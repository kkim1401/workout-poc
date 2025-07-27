import { cache } from 'react';
import {
  getUser as getUserBase,
  getUserProfile as getUserProfileBase,
} from './client';

export const getUser = cache(getUserBase);
export const getUserProfile = cache(getUserProfileBase);
