import { connection } from "next/server";

import AgentCallsView from "@/components/agent/calls/AgentCallsView";

export const metadata = {
  title: "Call Workspace · Calliana",
  description: "Review, log and route your client calls.",
};

/**
 * The agent workspace's Calls. The shell lives in the layout. The list's
 * state lives in its URL, so it renders per request: a shared link
 * (`?view=missed&call=…`) arrives filtered, with that call's details open.
 */
export default async function AgentCallsPage() {
  await connection();
  return <AgentCallsView />;
}
