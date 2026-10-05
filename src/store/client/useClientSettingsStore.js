import { clientSettingsData } from "@/data/client/settings.data";
import { createSettingsStore } from "@/store/settings/createSettingsStore";

/** The client portal's Settings — the shared settings store over its data. */
export const useClientSettingsStore = createSettingsStore(clientSettingsData);
