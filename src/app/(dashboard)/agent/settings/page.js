import { connection } from "next/server";

import AgentSettingsView from "@/components/agent/settings/AgentSettingsView";

export const metadata = {
  title: "Settings · Calliana",
  description:
    "General, notification, call, calendar and security preferences.",
};

/**
 * The agent workspace's Settings. The shell lives in the layout. The
 * Change Password modal is in the URL (`?modal=change-password`), so the
 * page renders per request and a shared link opens it.
 */
export default async function AgentSettingsPage() {
  await connection();
  return <AgentSettingsView />;
}
