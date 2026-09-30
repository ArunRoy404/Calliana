import { z } from "zod";

import { newPasswordField } from "@/schemas/auth/shared.schema";

/** Validation for the change-password modal — Figma 319:34461. */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: newPasswordField,
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((values) => values?.newPassword === values?.confirmPassword, {
    message: "Passwords don’t match",
    path: ["confirmPassword"],
  });

export const changePasswordDefaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
