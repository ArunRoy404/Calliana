import { connection } from "next/server";

import ReportsDashboard from "@/app/(dashboard)/admin/reports/_components/ReportsDashboard";

export const metadata = {
  title: "Reports · Calliana",
  description:
    "Visual analytics on telephony answer rates, peak calling hours, and appointment conversion.",
};

export default async function ReportsPage() {
  await connection();
  return <ReportsDashboard />;
}
