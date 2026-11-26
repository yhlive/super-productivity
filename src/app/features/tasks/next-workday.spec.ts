import { canPlanForWorkday, nextWorkday } from './next-workday';
import { getDbDateStr } from '../../util/get-db-date-str';

describe('Plan for next workday', () => {
  const monday = '2026-12-07';

  it('skips the weekend and preserves the input date', () => {
    const friday = new Date(2026, 11, 4, 12);
    expect(getDbDateStr(nextWorkday(friday))).toBe(monday);
    expect(getDbDateStr(friday)).toBe('2026-12-04');
  });

  it('only moes eligible task', () => {
    const open = { isDone: false };
    expect(canPlanForWorkday({ ...open, deadlineDay: monday }, monday)).toBe(true);
    expect(canPlanForWorkday({ ...open, dueWithTime: 42 }, monday)).toBe(false);
    expect(canPlanForWorkday({ ...open, repeatCfgId: 'weekly' }, monday)).toBe(false);
    expect(canPlanForWorkday({ ...open, deadlineDay: '2026-12-06' }, monday)).toBe(false);
    expect(canPlanForWorkday({ ...open, dueDay: monday }, monday)).toBe(false);
    expect(
      canPlanForWorkday({ ...open, dueWithTime: +new Date(2026, 11, 6, 18) }, monday),
    ).toBe(false);
    expect(
      canPlanForWorkday(
        { ...open, deadlineWithTime: +new Date(2026, 11, 6, 18) },
        monday,
      ),
    ).toBe(false);
  });
});
