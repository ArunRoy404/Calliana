import { z } from "zod";

/** Validation for the sign-in form. Consumed by `useSignInFormStore`. */
export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email")
    .pipe(z.email("That doesn’t look like a valid email")),
  password: z
    .string()
    .min(1, "Enter your password")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export const signInDefaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

/**
 * Flatten Zod issues to `{ field: firstMessage }`.
 * Only the first issue per field is surfaced, so the form shows one message.
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
