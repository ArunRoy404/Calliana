import { OTP_LENGTH } from "@/schemas/auth/shared.schema";
import {
  verifyEmailDefaultValues,
  verifyEmailSchema,
} from "@/schemas/auth/verify-email.schema";
import { createFormStore } from "@/store/createFormStore";

/**
 * Verify-email form state — Figma 43:8957.
 *
 * `resendCode` is the one action unique to this form; there is no endpoint
 * behind it yet, so it only bumps a counter the UI can react to.
 */
export const useVerifyEmailFormStore = createFormStore({
  schema: verifyEmailSchema,
  defaultValues: verifyEmailDefaultValues,
  extend: (set, get) => ({
    resendCount: 0,

    resendCode: () => set((state) => ({ resendCount: state?.resendCount + 1 })),

    /**
     * The code boxes never blur field-by-field, so a complete code is the
     * moment it makes sense to start showing validation.
     */
    setCode: (updater) => {
      get()?.setField?.("code", updater);

      if (get()?.values?.code?.length === OTP_LENGTH) {
        get()?.touchField?.("code");
      }
    },
  }),
});
