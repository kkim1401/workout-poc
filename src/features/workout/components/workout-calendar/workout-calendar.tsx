'use client';

import { addDays } from '@/lib/utils';
import clsx from 'clsx';
import CalendarDay from './calendar-day';
import styles from './workout-calendar.module.css';

const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function getDaysByDayName(date: Date): { [index: string]: number } {
  const currDayIndex = date.getDay();
  return dayNames.reduce((acc, curr, index) => {
    return {
      ...acc,
      [curr]: addDays(date, index - currDayIndex).getDate(),
    };
  }, {});
}

function getCurrentDayName(date: Date) {
  const currDayIndex = date.getDay();
  return dayNames[currDayIndex];
}

type WorkoutCalendarProps = { className?: string };

export default function WorkoutCalendar({ className }: WorkoutCalendarProps) {
  const date = new Date();
  const daysByDayName = getDaysByDayName(date);
  const currentDayName = getCurrentDayName(date);

  return (
    <section className={clsx(styles.container, className)}>
      {Object.entries(daysByDayName).map(([dayName, dayNumber]) => (
        <CalendarDay
          key={dayName}
          dayName={dayName}
          dayNumber={dayNumber}
          selected={currentDayName === dayName}
        />
      ))}
    </section>
  );
}
