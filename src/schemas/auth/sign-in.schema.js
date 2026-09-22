import { z } from "zod";

import { emailField, passwordField } from "@/schemas/auth/shared.schema";

/** Validation for the sign-in form. Consumed by `useSignInFormStore`. */
export const signInSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean(),
});

export const signInDefaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};
