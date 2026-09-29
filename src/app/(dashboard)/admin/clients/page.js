import { connection } from "next/server";

import ClientsDirectory from "@/app/(dashboard)/admin/clients/_components/ClientsDirectory";

export const metadata = {
  title: "Clients · Calliana",
  description: "Manage all client accounts on the platform.",
};

/**
 * Clients — Figma 198:21625. The shell lives in the layout.
 *
 * The list's state lives in its URL, so the page renders per request and a
 * shared link arrives already filtered and paged (rule 26). When the list is
 * fetched from an API, parse the params here with `clientsParamsSchema` and
 * fetch with them.
 */
export default async function ClientsPage() {
  await connection();
  return <ClientsDirectory />;
}
