import { z } from "zod";

/** The settings page's own URL key: `?modal=change-password`. */
export const SETTINGS_MODAL_PARAM = "modal";
export const CHANGE_PASSWORD_MODAL = "change-password";

export const settingsParamsSchema = z.object({
  [SETTINGS_MODAL_PARAM]: z
    .enum([CHANGE_PASSWORD_MODAL])
    .optional()
    .catch(undefined),
});
