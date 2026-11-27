import { DEFAULT_TASK, Task } from '../../features/tasks/task.model';
import { estimateOverruns } from './extimate-overruns';

describe('Estimate overruns', () => {
  const minute = 60_000;
  const task = (id: string, estimate: number, actual: number): Task => ({
    ...DEFAULT_TASK,
    id,
    projectId: 'demo',
    timeEstimate: estimate * minute,
    timeSpent: actual * minute,
  });

  it('excludes unknown estimates, parent totals, and differences below the threshold', () => {
    const parent = { ...task('parent', 10, 90), subTaskIds: ['child'] };
    expect(
      estimateOverruns([parent, task('no-estimate', 0, 80), task('short', 10, 20)]),
    ).toEqual([]);
  });
});
