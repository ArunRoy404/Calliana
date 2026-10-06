import { create } from "zustand";

import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  CHANGE_PASSWORD_MODAL,
  SETTINGS_MODAL_PARAM,
  settingsParamsSchema,
} from "@/schemas/settings/settings-params.schema";

const defaults = searchParamDefaults(settingsParamsSchema);

/**
 * Open or close the change-password modal — `?modal=change-password` on
 * whichever settings page is showing. Shared by every settings store and
 * by the password form's own `closePanel`.
 */
export function setChangePasswordOpen(open) {
  writeUrlParams(
    { [SETTINGS_MODAL_PARAM]: open ? CHANGE_PASSWORD_MODAL : null },
    { defaults },
  );
}

/**
 * A settings page's store — the admin's Settings and the client portal's
 * are the same page over their own data (rule 0): the content, every
 * toggle row's value, and the change-password modal (`?modal=…`, rule 26 —
 * a page's open overlay lives in the URL even when the page is not a
 * list). There is no backend yet — a toggle still flips (so the page feels
 * real to click through), but "Save Changes" only shows the not-wired-up
 * toast, the same as every other form in the app without a backend.
 */
export function createSettingsStore(data) {
  const toggles = Object.fromEntries(
    data?.sections?.flatMap(
      (section) =>
        section?.rows
          ?.filter((row) => row?.type === "toggle")
          ?.map((row) => [row?.id, Boolean(row?.defaultValue)]) ?? [],
    ) ?? [],
  );

  return create((set) => ({
    content: data,
    toggles,
    paramsSchema: settingsParamsSchema,

    toggleSetting: (id) =>
      set((state) => ({
        toggles: { ...state?.toggles, [id]: !state?.toggles?.[id] },
      })),

    isChangePasswordOpen: (params) =>
      params?.[SETTINGS_MODAL_PARAM] === CHANGE_PASSWORD_MODAL,
    openChangePassword: () => setChangePasswordOpen(true),
    setChangePasswordOpen,
  }));
}
