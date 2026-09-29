import { notFound } from "next/navigation";
import { connection } from "next/server";

import ClientDetailView from "@/components/clients/detail/ClientDetailView";
import { useClientsStore } from "@/store/admin/useClientsStore";

/** The record for this URL's client, or `null` — read on the server. */
async function clientFrom(params) {
  const { clientId } = (await params) ?? {};
  return useClientsStore.getState()?.clientById?.(clientId) ?? null;
}

export async function generateMetadata({ params }) {
  const client = await clientFrom(params);

  return {
    title: client ? `${client?.name} · Clients · Calliana` : "Client not found",
    description: client?.specialty,
  };
}

/**
 * One client — Figma 198:30338 and its tab frames. The shell lives in the
 * layout.
 *
 * Rendered per request, so `?tab=calls` arrives already on the Calls tab; an
 * unknown client id is a real 404 rather than an empty page. When clients come
 * from an API, fetch the record here and pass it down.
 */
export default async function ClientDetailPage({ params }) {
  await connection();

  const client = await clientFrom(params);
  if (!client) notFound();

  return <ClientDetailView clientId={client?.id} />;
}
