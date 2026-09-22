import DashboardShell from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Agent · Calliana",
};

export default function AgentLayout({ children }) {
  return <DashboardShell role="agent">{children}</DashboardShell>;
}
