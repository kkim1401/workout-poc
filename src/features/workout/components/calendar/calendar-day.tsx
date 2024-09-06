import { concatClasses } from '@/utils';
import styles from './calendar-day.module.css';

type CalendarDayProps = {
  current?: boolean;
  dayName: string;
  dayNumber: number;
};

export default function CalendarDay({
  current,
  dayName,
  dayNumber,
}: CalendarDayProps) {
  return (
    <div className={styles.container}>
      <div className='subtitle2'>{dayName}</div>
      <div
        className={concatClasses(
          'body1',
          styles.day,
          current && styles.current
        )}
      >
        {dayNumber}
      </div>
    </div>
  );
}
