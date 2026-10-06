"use client";

import CallsDirectory from "@/components/calls/CallsDirectory";
import { useAgentCallsStore } from "@/store/agent/useAgentCallsStore";

/**
 * The agent workspace's Calls — the shared `CallsDirectory` over the
 * agent's calls store. A server page cannot hand a store hook to a client
 * component, so this one line is its own client file.
 */
export default function AgentCallsView() {
  return <CallsDirectory useStore={useAgentCallsStore} />;
}
