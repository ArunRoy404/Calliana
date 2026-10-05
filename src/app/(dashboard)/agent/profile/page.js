import AgentProfileView from "@/components/agent/profile/AgentProfileView";

export const metadata = {
  title: "Profile · Calliana",
  description: "Your personal information and working hours.",
};

/** The agent workspace's Profile. The shell lives in the layout. */
export default function AgentProfilePage() {
  return <AgentProfileView />;
}
