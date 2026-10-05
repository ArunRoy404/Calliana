"use client";

import ReportsView from "@/components/reports/ReportsView";
import { useReportsStore } from "@/store/admin/useReportsStore";

/**
 * The admin's Call Activity & Service Reports — the shared `ReportsView`
 * over the admin's reports store. A server page cannot hand a store hook to
 * a client component, so this one line is its own client file.
 */
export default function ReportsDashboard() {
  return <ReportsView useStore={useReportsStore} />;
}
