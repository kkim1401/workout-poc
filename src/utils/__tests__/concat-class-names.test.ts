import concatClassNames from '../concat-class-names';

describe('concatClassNames', () => {
  it('should concat class names into one', () => {
    expect(concatClassNames('foo', 'bar', 'cat')).toBe('foo bar cat');
  });

  it('should treat undefined as empty strings', () => {
    expect(concatClassNames('foo', undefined)).toBe('foo');
  });

  it('should return an empty string if all inputs are undefined', () => {
    expect(concatClassNames(undefined, undefined)).toBe('');
  });
});
