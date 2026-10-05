import ClientDashboard from "@/components/client/dashboard/ClientDashboard";

export const metadata = {
  title: "Dashboard Overview · Calliana",
  description: "What’s happening with your line, calls and bookings today.",
};

/**
 * The client portal's home. The shell (client sidebar, top bar and its
 * "Dashboard Overview" heading) lives in the layout. Nothing here reads the
 * URL, so it renders statically.
 */
export default function ClientDashboardPage() {
  return <ClientDashboard />;
}
