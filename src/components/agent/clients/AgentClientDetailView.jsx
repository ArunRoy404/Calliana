"use client";

import ClientDetailView from "@/components/clients/detail/ClientDetailView";
import { useAgentClientsStore } from "@/store/agent/useAgentClientsStore";

/**
 * One client's page in the agent workspace — the shared `ClientDetailView`
 * over the agent's clients store. A server page cannot hand a store hook to
 * a client component, so this one line is its own client file.
 */
export default function AgentClientDetailView({ clientId }) {
  return (
    <ClientDetailView clientId={clientId} useStore={useAgentClientsStore} />
  );
}
