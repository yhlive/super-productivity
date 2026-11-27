import { Task } from '../../features/tasks/task.model';

const minimumOverrun = 30 * 60 * 1000; // 30 minutes

export interface EstimateOverrun {
  task: Task;
  overrun: number;
}

export const estimateOverruns = (tasks: readonly Task[]): EstimateOverrun[] =>
  tasks
    .filter((task) => !task.subTaskIds?.length && task.timeEstimate > 0)
    .map((task) => ({ task, overrun: task.timeSpent - task.timeEstimate }))
    .filter(({ overrun }) => overrun >= minimumOverrun)
    .sort((a, b) => b.overrun - a.overrun || a.task.id.localeCompare(b.task.id));
