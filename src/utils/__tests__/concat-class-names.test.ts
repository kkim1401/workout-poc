import concatClasses from '../concat-classes';

describe('concatClasses', () => {
  it('should concat class names into one', () => {
    expect(concatClasses('foo', 'bar', 'cat')).toBe('foo bar cat');
  });

  it('should treat undefined as empty strings', () => {
    expect(concatClasses('foo', undefined)).toBe('foo');
  });

  it('should treat true as empty strings', () => {
    expect(concatClasses('foo', true)).toBe('foo');
  });

  it('should treat false as empty strings', () => {
    expect(concatClasses('foo', false)).toBe('foo');
  });

  it('should return an empty string if all inputs are undefined', () => {
    expect(concatClasses(undefined, undefined)).toBe('');
  });

  it('should return an empty string if all inputs are boolean values', () => {
    expect(concatClasses(false, true)).toBe('');
  });
});
