import { connection } from "next/server";

import ClientSettingsView from "@/components/client/settings/ClientSettingsView";

export const metadata = {
  title: "Settings · Calliana",
  description: "Profile, notification, communication and security preferences.",
};

/**
 * The client portal's Settings. The shell lives in the layout. The
 * change-password modal is in the URL (`?modal=change-password`), so the
 * page renders per request and a shared link opens it.
 */
export default async function ClientSettingsPage() {
  await connection();
  return <ClientSettingsView />;
}
