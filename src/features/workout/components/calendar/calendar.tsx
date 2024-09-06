import { addDays, concatClasses } from '@/utils';
import CalendarDay from './calendar-day';
import styles from './calendar.module.css';

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function getDaysByDayName(date: Date): { [index: string]: number } {
  const currDayIndex = date.getDay();
  return dayNames.reduce((acc, curr, index) => {
    return {
      ...acc,
      [curr]: addDays(date, index - currDayIndex - 1).getDate(),
    };
  }, {});
}

function getCurrentDayName(date: Date) {
  const currDayIndex = date.getDay();
  return dayNames[currDayIndex];
}

type CalendarProps = { className?: string };

export default function Calendar({ className }: CalendarProps) {
  const date = new Date();
  const daysByDayName = getDaysByDayName(date);
  const currentDayName = getCurrentDayName(date);

  return (
    <section className={concatClasses(styles.container, className)}>
      {Object.entries(daysByDayName).map(([dayName, dayNumber]) => (
        <CalendarDay
          key={dayName}
          current={currentDayName === dayName}
          dayName={dayName}
          dayNumber={dayNumber}
        />
      ))}
    </section>
  );
}