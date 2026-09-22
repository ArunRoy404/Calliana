import { z } from "zod";

import { newPasswordField } from "@/schemas/auth/shared.schema";

/** Validation for the reset-password form — Figma 43:9138. */
export const resetPasswordSchema = z
  .object({
    password: newPasswordField,
    confirmPassword: z.string().min(1, "Re-enter your new password"),
  })
  // Report the mismatch on the second field, which is the one to correct.
  .refine((values) => values?.password === values?.confirmPassword, {
    message: "Both passwords must match",
    path: ["confirmPassword"],
  });

export const resetPasswordDefaultValues = { password: "", confirmPassword: "" };
