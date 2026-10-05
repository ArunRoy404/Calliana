import { agentProfileData } from "@/data/agent/profile.data";
import { createProfileStore } from "@/store/profile/createProfileStore";

/** The agent workspace's Profile — the shared profile store over its data. */
export const useAgentProfileStore = createProfileStore(agentProfileData);
