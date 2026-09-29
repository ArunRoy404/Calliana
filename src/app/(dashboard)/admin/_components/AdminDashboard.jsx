"use client";

import AgentAvailabilityPanel from "@/components/dashboard/agents/AgentAvailabilityPanel";
import AttentionPanel from "@/components/dashboard/attention/AttentionPanel";
import AuditTrailPanel from "@/components/dashboard/audit/AuditTrailPanel";
import LiveCallsPanel from "@/components/dashboard/live-calls/LiveCallsPanel";
import StatCardGrid from "@/components/dashboard/stats/StatCardGrid";
import { revealDelayAt } from "@/lib/motion";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/**
 * Operations overview — Figma 167:49827.
 *
 * The design lays this out as 4 + 3 stat cards, then two pairs of panels. Each
 * pair stacks below `xl`, where 798px columns would otherwise squeeze.
 *
 * Nothing here animates. Every card and panel reveals itself, and this page
 * only hands out the order: the stat cards one by one, then the panels in
 * reading order, each panel's rows following it in.
 */
export default function AdminDashboard() {
  const primary = useAdminContentStore(
    (state) => state.dashboard?.stats?.primary,
  );
  const secondary = useAdminContentStore(
    (state) => state.dashboard?.stats?.secondary,
  );

  const primaryCount = primary?.length ?? 0;
  const panelsStart = revealDelayAt(0, primaryCount + (secondary?.length ?? 0));

  return (
    <div className="flex flex-col gap-4">
      <StatCardGrid stats={primary} columns={4} />
      <StatCardGrid
        stats={secondary}
        columns={3}
        revealDelay={revealDelayAt(0, primaryCount)}
      />

      <div className="grid grid-cols-1 gap-4 xl:auto-rows-[minmax(312px,auto)] xl:grid-cols-2">
        <LiveCallsPanel revealDelay={revealDelayAt(panelsStart, 0)} />
        <AttentionPanel revealDelay={revealDelayAt(panelsStart, 1)} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:auto-rows-[minmax(431px,auto)] xl:grid-cols-2">
        <AgentAvailabilityPanel revealDelay={revealDelayAt(panelsStart, 2)} />
        <AuditTrailPanel revealDelay={revealDelayAt(panelsStart, 3)} />
      </div>
    </div>
  );
}
