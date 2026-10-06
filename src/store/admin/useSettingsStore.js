import { settingsData } from "@/data/admin/settings.data";
import { createSettingsStore } from "@/store/settings/createSettingsStore";

/** The admin's Settings — the shared settings store over the admin's data. */
export const useSettingsStore = createSettingsStore(settingsData);
