import { getDbDateStr } from '../../util/get-db-date-str';
import { Task } from './task.model';

export const nextWorkday = (today: Date): Date => {
  const next = new Date(today);
  next.setHours(12, 0, 0, 0);
  do {
    next.setDate(next.getDate() + 1);
  } while (next.getDay() === 0 || next.getDay() === 6);
  return next;
};

type ScheduleFields = Pick<
  Task,
  'isDone' | 'dueWithTime' | 'dueDay' | 'deadlineDay' | 'deadlineWithTime' | 'repeatCfgId'
>;

export const canPlanForWorkday = (task: ScheduleFields, day: string): boolean => {
  const deadline = task.deadlineWithTime
    ? getDbDateStr(task.deadlineWithTime)
    : task.deadlineDay;
  return (
    !task.isDone &&
    !task.dueWithTime &&
    !task.repeatCfgId &&
    task.dueDay !== day &&
    (!deadline || deadline >= day)
  );
};
