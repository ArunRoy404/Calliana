"use client";

import SettingsView from "@/components/settings/SettingsView";
import { useAgentSettingsStore } from "@/store/agent/useAgentSettingsStore";

/**
 * The agent workspace's Settings — the shared `SettingsView` (and its
 * Change Password modal) over the agent's settings store. A server page
 * cannot hand a store hook to a client component, so this one line is its
 * own client file.
 */
export default function AgentSettingsView() {
  return <SettingsView useStore={useAgentSettingsStore} />;
}
