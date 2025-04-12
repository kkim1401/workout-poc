'use server';

import { z } from 'zod';

const schema = z.object({
  title: z.string(),
});

/** Look up if server action is necessary for client-side form submission */
export async function createWorkout(
  _prevState: unknown,
  formData: FormData
): Promise<{ fieldErrors?: { title?: string[] }; message?: string } | void> {
  const rawFormData = Object.fromEntries(formData);
  const validatedFields = schema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return validatedFields.error.flatten();
  }

  console.log({ rawFormData, validatedFields });
}
