/**
 * Flatten Zod issues to `{ field: firstMessage }`.
 * Only the first issue per field is surfaced, so a form shows one message.
 */
export function toFieldErrors(error) {
  const fieldErrors = {};

  for (const issue of error?.issues ?? []) {
    const field = issue?.path?.[0];
    if (field && !fieldErrors?.[field]) {
      fieldErrors[field] = issue?.message;
    }
  }

  return fieldErrors;
}
