import DashboardShell from "@/components/layout/DashboardShell";

export const metadata = {
  title: "Client · Calliana",
};

export default function ClientLayout({ children }) {
  return <DashboardShell role="client">{children}</DashboardShell>;
}
