import { Button, Card, TextField } from '@/features/common/components';
import clsx from 'clsx';
import { ExercisesField } from './exercises-field';
import styles from './form.module.css';

type FormProps = {
  className?: string;
};

export default function Form({ className }: FormProps) {
  return (
    <Card className={clsx(styles.container, className)} as='form'>
      <h1 className='headline4'>Create Workout</h1>
      <TextField name='title' type='text' label='Title' />
      <ExercisesField className={styles.exercisesField} />
      <Button className={styles.saveWorkoutButton}>Save Workout</Button>
    </Card>
  );
}
