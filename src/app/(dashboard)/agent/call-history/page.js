import { connection } from "next/server";

import AgentCallHistoryView from "@/components/agent/call-history/AgentCallHistoryView";

export const metadata = {
  title: "Call History · Calliana",
  description: "Every call you have handled, with its outcome.",
};

/**
 * The agent workspace's Call History. The shell lives in the layout. The
 * list's state lives in its URL, so a shared link
 * (`?direction=incoming&outcome=missed`) arrives already filtered.
 */
export default async function AgentCallHistoryPage() {
  await connection();
  return <AgentCallHistoryView />;
}
