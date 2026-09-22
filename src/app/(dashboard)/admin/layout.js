import DashboardShell from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Admin · Calliana",
  description: "Monitor calls, clients, agents and service activity.",
};

export default function AdminLayout({ children }) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
