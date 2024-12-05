import addDays from '../add-days';

jest.useFakeTimers().setSystemTime(new Date(new Date('2020-01-06T00:00:00Z')));

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
