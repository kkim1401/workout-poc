import { cache } from 'react';
import { getUser as getUserBase } from './client';

export const getUser = cache(getUserBase);
