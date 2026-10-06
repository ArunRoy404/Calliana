"use client";

import CallsDirectory from "@/components/calls/CallsDirectory";
import { useAgentVoicemailStore } from "@/store/agent/useAgentVoicemailStore";

/**
 * The agent workspace's Voicemail — the shared `CallsDirectory` (the list,
 * cards and details drawer; no dialer, as the list has no add action) over
 * the agent's voicemail store. A server page cannot hand a store hook to a
 * client component, so this one line is its own client file.
 */
export default function AgentVoicemailView() {
  return <CallsDirectory useStore={useAgentVoicemailStore} />;
}
