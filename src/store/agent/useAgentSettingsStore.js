import { agentSettingsData } from "@/data/agent/settings.data";
import { createSettingsStore } from "@/store/settings/createSettingsStore";

/** The agent workspace's Settings — the shared settings store over its data. */
export const useAgentSettingsStore = createSettingsStore(agentSettingsData);
