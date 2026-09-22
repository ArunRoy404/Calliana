import {
  resetPasswordDefaultValues,
  resetPasswordSchema,
} from "@/schemas/auth/reset-password.schema";
import { createFormStore } from "@/store/createFormStore";

/** Reset-password form state — Figma 43:9138. */
export const useResetPasswordFormStore = createFormStore({
  schema: resetPasswordSchema,
  defaultValues: resetPasswordDefaultValues,
});
