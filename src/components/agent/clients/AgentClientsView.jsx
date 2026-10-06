"use client";

import ClientsDirectory from "@/components/clients/ClientsDirectory";
import { useAgentClientsStore } from "@/store/agent/useAgentClientsStore";

/**
 * The agent workspace's Client Accounts — the shared `ClientsDirectory`
 * over the agent's clients store. A server page cannot hand a store hook to
 * a client component, so this one line is its own client file.
 */
export default function AgentClientsView() {
  return <ClientsDirectory useStore={useAgentClientsStore} />;
}
