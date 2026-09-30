import { create } from "zustand";

import { settingsData } from "@/data/admin/settings.data";
import {
  CHANGE_PASSWORD_MODAL,
  SETTINGS_MODAL_PARAM,
  settingsParamsSchema,
} from "@/schemas/settings/settings-params.schema";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";

/** Every toggle row's starting value, keyed by its id. */
const initialToggles = Object.fromEntries(
  settingsData?.sections?.flatMap(
    (section) =>
      section?.rows
        ?.filter((row) => row?.type === "toggle")
        ?.map((row) => [row?.id, Boolean(row?.defaultValue)]) ?? [],
  ) ?? [],
);

const defaults = searchParamDefaults(settingsParamsSchema);

/**
 * The settings page's content, its toggles, and the change-password modal
 * (`?modal=change-password`, rule 26 — a page's open overlay lives in the
 * URL even when the page itself isn't a `createTableStore` list). There is
 * no backend yet — a toggle still flips (so the page feels real to click
 * through), but "Save Changes" only shows the not-wired-up toast, the same
 * as every other form in the app without a backend.
 */
export const useSettingsStore = create((set) => ({
  content: settingsData,
  toggles: initialToggles,
  paramsSchema: settingsParamsSchema,

  toggleSetting: (id) =>
    set((state) => ({ toggles: { ...state?.toggles, [id]: !state?.toggles?.[id] } })),

  isChangePasswordOpen: (params) => params?.[SETTINGS_MODAL_PARAM] === CHANGE_PASSWORD_MODAL,
  openChangePassword: () =>
    writeUrlParams({ [SETTINGS_MODAL_PARAM]: CHANGE_PASSWORD_MODAL }, { defaults }),
  setChangePasswordOpen: (open) =>
    writeUrlParams({ [SETTINGS_MODAL_PARAM]: open ? CHANGE_PASSWORD_MODAL : null }, { defaults }),
}));
