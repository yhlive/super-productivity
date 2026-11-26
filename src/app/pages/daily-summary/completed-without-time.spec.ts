import { Task } from '../../features/tasks/task.model';
import { completedWithoutTime } from './completed-without-time';

describe('Completed without time', () => {
  const day = '2026-12-04';
  const dayBefore = '2026-12-03';
  const doneOn = +new Date(2026, 11, 4, 15);
  const row = (id: string, extra: Partial<Task> = {}): Task =>
    ({
      id,
      isDone: true,
      doneOn,
      subTaskIds: [],
      ...extra,
    }) as Task;

  it('selects only completed leaves with zero or missiong time on the selected date', () => {
    const tasks = [
      row('missing'),
      row('zero', { timeSpentOnDay: { [day]: 0, [dayBefore]: 500 } }),
      row('logged', { timeSpentOnDay: { [day]: 500 } }),
      row('open', { isDone: false }),
      row('parent', { subTaskIds: ['missing'] }),
      row('skipped', { wontDoOn: doneOn }),
      row('different-day', { doneOn: +new Date(2026, 11, 3, 15) }),
    ];
    expect(completedWithoutTime(tasks, day, 0).map((t) => t.id)).toEqual([
      'missing',
      'zero',
    ]);
  });

  it('uses the configured logical day around midnight', () => {
    const afterMidnight = row('late', { doneOn: +new Date(2026, 11, 5, 1) });
    expect(completedWithoutTime([afterMidnight], day, 0).map((t) => t.id)).toEqual([]);
    expect(
      completedWithoutTime([afterMidnight], day, 1000 * 60 * 60 * 2).map((t) => t.id),
    ).toEqual(['late']);
  });
});
