"use client";

import ProfileView from "@/components/profile/ProfileView";
import { useAgentProfileStore } from "@/store/agent/useAgentProfileStore";

/**
 * The agent workspace's Profile — the shared `ProfileView` over the agent's
 * profile store. A server page cannot hand a store hook to a client
 * component, so this one line is its own client file.
 */
export default function AgentProfileView() {
  return <ProfileView useStore={useAgentProfileStore} />;
}
