import { notFound } from "next/navigation";
import { connection } from "next/server";

import AgentClientDetailView from "@/components/agent/clients/AgentClientDetailView";
import { useAgentClientsStore } from "@/store/agent/useAgentClientsStore";

/** The record for this URL's client, or `null` — read on the server. */
async function clientFrom(params) {
  const { clientId } = (await params) ?? {};
  return useAgentClientsStore.getState()?.clientById?.(clientId) ?? null;
}

export async function generateMetadata({ params }) {
  const client = await clientFrom(params);

  return {
    title: client
      ? `${client?.name} · Client Accounts · Calliana`
      : "Client not found",
    description: client?.specialty,
  };
}

/**
 * One client in the agent workspace. Rendered per request, so `?tab=calls`
 * arrives already on the Calls tab; an unknown client id is a real 404.
 */
export default async function AgentClientDetailPage({ params }) {
  await connection();

  const client = await clientFrom(params);
  if (!client) notFound();

  return <AgentClientDetailView clientId={client?.id} />;
}
