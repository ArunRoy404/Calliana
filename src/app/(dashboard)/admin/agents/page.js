import { connection } from "next/server";

import AgentsDirectory from "@/app/(dashboard)/admin/agents/_components/AgentsDirectory";

export const metadata = {
  title: "Agents · Calliana",
  description: "Manage agent accounts and assignments.",
};

/**
 * Agents — Figma 198:22835. The shell lives in the layout.
 *
 * The page's state lives in its URL, so it renders per request: a shared link
 * (`?status=busy&page=2&agent=…`) arrives already filtered, paged and with the
 * panel open, instead of flashing the default view first. When the list is
 * fetched from an API, parse the params here with the same schema and fetch
 * with them:
 * `parseSearchParams(agentsParamsSchema, await searchParams)`.
 */
export default async function AgentsPage() {
  await connection();
  return <AgentsDirectory />;
}
