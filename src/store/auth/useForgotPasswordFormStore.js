import {
  forgotPasswordDefaultValues,
  forgotPasswordSchema,
} from "@/schemas/auth/forgot-password.schema";
import { createFormStore } from "@/store/createFormStore";

/** Forgot-password form state — Figma 43:8790. */
export const useForgotPasswordFormStore = createFormStore({
  schema: forgotPasswordSchema,
  defaultValues: forgotPasswordDefaultValues,
});
