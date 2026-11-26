import { Task } from '../../features/tasks/task.model';
import { isCompletedTask } from '../../features/tasks/util/is-wont-do-task';
import { getDbDateStrWithOffset } from '../../util/get-db-date-str';

export const completedWithoutTime = (
  tasks: readonly Task[],
  day: string,
  offsetMs: number,
): Task[] =>
  tasks.filter(
    (task) =>
      isCompletedTask(task) &&
      task.doneOn != null &&
      getDbDateStrWithOffset(task.doneOn, offsetMs) === day &&
      !task.subTaskIds?.length &&
      (task.timeSpentOnDay?.[day] ?? 0) === 0,
  );
