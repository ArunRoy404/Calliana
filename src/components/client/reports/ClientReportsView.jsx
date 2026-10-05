"use client";

import ReportsView from "@/components/reports/ReportsView";
import { useClientReportsStore } from "@/store/client/useClientReportsStore";

/**
 * The client portal's Reports & Activity — the shared `ReportsView` over the
 * client's reports store, which adds Peak Call Hours. A server page cannot
 * hand a store hook to a client component, so this one line is its own
 * client file.
 */
export default function ClientReportsView() {
  return <ReportsView useStore={useClientReportsStore} />;
}
