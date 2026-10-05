import { connection } from "next/server";

import ClientReportsView from "@/components/client/reports/ClientReportsView";

export const metadata = {
  title: "Reports & Activity · Calliana",
  description:
    "Your call volume, outcomes, peak call hours and recent activity at a glance.",
};

/**
 * The client portal's Reports & Activity. The shell lives in the layout. The
 * period lives in the URL (`?period=week`), so it renders per request and a
 * shared link arrives on the same period.
 */
export default async function ClientReportsPage() {
  await connection();
  return <ClientReportsView />;
}
