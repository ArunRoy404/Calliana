import AgentDashboard from "@/components/agent/dashboard/AgentDashboard";

export const metadata = {
  title: "Dashboard · Calliana",
  description:
    "Your live call, today's schedules, conversations, follow-ups and call history.",
};

/** The agent workspace's home. The shell lives in the layout. */
export default function AgentDashboardPage() {
  return <AgentDashboard />;
}
