import { concatClasses } from '@/utils';
import styles from './calendar-day.module.css';

type CalendarDayProps = {
  dayName: string;
  dayNumber: number;
  selected?: boolean;
};

export default function CalendarDay({
  dayName,
  dayNumber,
  selected,
}: CalendarDayProps) {
  return (
    <div className={styles.container}>
      <div className='subtitle2'>{dayName}</div>
      <div
        className={concatClasses(
          'body1',
          styles.day,
          selected && styles.selected
        )}
      >
        {dayNumber}
      </div>
    </div>
  );
}
