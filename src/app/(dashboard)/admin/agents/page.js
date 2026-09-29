import AgentsDirectory from "@/app/(dashboard)/admin/agents/_components/AgentsDirectory";

export const metadata = {
  title: "Agents · Calliana",
  description: "Manage agent accounts and assignments.",
};

/** Agents — Figma 198:22835. The shell lives in the layout. */
export default function AgentsPage() {
  return <AgentsDirectory />;
}
