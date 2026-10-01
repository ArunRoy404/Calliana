import { connection } from "next/server";

import SettingsView from "@/components/settings/SettingsView";

export const metadata = {
  title: "Settings · Calliana",
  description: "General, call, notification, security and data preferences.",
};

/** Settings — Figma 167:52969. The shell lives in the layout. */
export default async function SettingsPage() {
  await connection();
  return <SettingsView />;
}
