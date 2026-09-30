import { changePasswordData } from "@/data/admin/change-password.data";
import {
  changePasswordDefaultValues,
  changePasswordSchema,
} from "@/schemas/settings/change-password.schema";
import { useSettingsStore } from "@/store/admin/useSettingsStore";
import { createFormStore } from "@/store/createFormStore";

/**
 * The change-password form — Figma 319:34461. There is no backend yet, so a
 * valid submit closes the modal and says so, rather than pretending the
 * password changed.
 */
export const useChangePasswordFormStore = createFormStore({
  schema: changePasswordSchema,
  defaultValues: changePasswordDefaultValues,
  closePanel: () => useSettingsStore.getState()?.setChangePasswordOpen?.(false),
  notFunctional: {
    message: changePasswordData?.notFunctionalMessage,
    description: changePasswordData?.notFunctionalDescription,
  },
  extend: () => ({
    content: changePasswordData,
  }),
});
