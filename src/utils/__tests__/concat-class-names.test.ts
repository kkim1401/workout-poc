import concatClassNames from '../concat-class-names';

describe('concatClassNames', () => {
  it('should concat class names into one', () => {
    expect(concatClassNames('foo', 'bar')).toBe('foo bar');
  })
})