import clsx from 'clsx';
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
      <div className={clsx('body1', styles.day, selected && styles.selected)}>
        {dayNumber}
      </div>
    </div>
  );
}
