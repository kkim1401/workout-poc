export default async function failSafely<T>(
  promise: Promise<T>
): Promise<{ data: T | null; error: Error | null }> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error };
    }
    return { data: null, error: new Error('An unknown error occurred') };
  }
}
