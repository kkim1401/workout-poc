import { getDaysByDayName } from '../calendar';

jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2020, 0, 6)));

describe('getDaysByDayName', () => {
  it('getDaysByDayName should return a dictionary of days', () => {
    expect(getDaysByDayName(new Date())).toEqual({
      Su: 5,
      Mo: 6,
      Tu: 7,
      We: 8,
      Th: 9,
      Fr: 10,
      Sa: 11,
    });
  });
});
