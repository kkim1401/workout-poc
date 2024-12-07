import addDays from '../add-days';

jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2020, 0, 6)));

describe('addDays', () => {
  it('should add days and return new Date instance if second argument is positive', () => {
    expect(addDays(new Date(), 3).toDateString()).toBe('Thu Jan 09 2020');
  });

  it('should subtract days and return new Date instance if second argument is negative', () => {
    expect(addDays(new Date(), -3).toDateString()).toBe('Fri Jan 03 2020');
  });

  it('should return passed-in date if second argument is 0', () => {
    expect(addDays(new Date(), 0).toDateString()).toBe('Mon Jan 06 2020');
  });
});
