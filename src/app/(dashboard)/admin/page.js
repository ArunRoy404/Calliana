import AdminDashboard from "@/app/(dashboard)/admin/_components/AdminDashboard";

export const metadata = {
  title: "Operations Overview · Calliana",
  description: "Monitor calls, clients, agents and service activity.",
};

/** Admin dashboard — Figma 167:49827. The shell lives in the layout. */
export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
