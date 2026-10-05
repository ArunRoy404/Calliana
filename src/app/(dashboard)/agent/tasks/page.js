import { connection } from "next/server";

import AgentTasksView from "@/components/agent/tasks/AgentTasksView";

export const metadata = {
  title: "Task & Follow-ups · Calliana",
  description: "Track client commitments and triage follow-ups.",
};

/**
 * The agent workspace's Task & Follow-ups. The shell lives in the layout.
 * The list's state lives in its URL, so a shared link (`?view=mine&page=2`,
 * `?panel=add`) arrives already filtered, paged or with the drawer open.
 */
export default async function AgentTasksPage() {
  await connection();
  return <AgentTasksView />;
}
