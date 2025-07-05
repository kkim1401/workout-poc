import failSafely from '../fail-safely';

describe('failSafely', () => {
  it('should return the result of the promise if it resolves', async () => {
    const promise = Promise.resolve('success');
    const result = await failSafely(promise);
    expect(result).toEqual({ data: 'success', error: null });
  });

  it('should return an error object if the promise rejects', async () => {
    const errorMessage = 'Something went wrong';
    const error = new Error(errorMessage);
    const promise = Promise.reject(error);
    const result = await failSafely(promise);
    expect(result).toEqual({ data: null, error });
  });

  it('should return a generic error if the error is not an instance of Error', async () => {
    const promise = Promise.reject('A string error');
    const result = await failSafely(promise);
    expect(result).toEqual({
      data: null,
      error: new Error('An unknown error occurred'),
    });
  });
});
