import { SET_INSTANCE_SELECT, SET_TEMPLATE_SELECT } from '../sets/selectors';

// Workout Template selectors
export const WORKOUT_TEMPLATE_BASE_SELECT = '*';
export const WORKOUT_TEMPLATE_SELECT = `*, set_templates(${SET_TEMPLATE_SELECT})`;

// Workout Instance selectors
export const WORKOUT_INSTANCE_BASE_SELECT = '*';
export const WORKOUT_INSTANCE_SELECT = `*, set_instances(${SET_INSTANCE_SELECT}), workout_templates(name, set_templates(${SET_TEMPLATE_SELECT}))`;
