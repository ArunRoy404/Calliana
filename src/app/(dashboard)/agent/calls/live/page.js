import { connection } from "next/server";

import LiveCallWorkspace from "@/components/agent/live-call/LiveCallWorkspace";

export const metadata = {
  title: "Live Call Workspace · Calliana",
  description:
    "Active call context, client instructions and call documentation.",
};

/**
 * The agent's Live Call Workspace — an inner page of Calls, so CALLS stays
 * lit. The side panel's tab, the calendar view, the open previous call and
 * the chosen script response live in the URL, so it renders per request
 * and a link reopens it as it was.
 */
export default async function LiveCallPage() {
  await connection();
  return <LiveCallWorkspace />;
}
