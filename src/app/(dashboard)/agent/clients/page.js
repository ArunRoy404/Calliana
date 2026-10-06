import { connection } from "next/server";

import AgentClientsView from "@/components/agent/clients/AgentClientsView";

export const metadata = {
  title: "Client Accounts · Calliana",
  description:
    "Directory of enterprise accounts, clinics and businesses supported on the Virtual Secretary platform.",
};

/**
 * The agent workspace's Client Accounts. The shell lives in the layout. The
 * list's state lives in its URL, so it renders per request and a shared
 * link arrives already filtered and paged (rule 26).
 */
export default async function AgentClientsPage() {
  await connection();
  return <AgentClientsView />;
}
