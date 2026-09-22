"use client";

import AgentAvailabilityPanel from "@/components/dashboard/agents/AgentAvailabilityPanel";
import AttentionPanel from "@/components/dashboard/attention/AttentionPanel";
import AuditTrailPanel from "@/components/dashboard/audit/AuditTrailPanel";
import LiveCallsPanel from "@/components/dashboard/live-calls/LiveCallsPanel";
import StatCardGrid from "@/components/dashboard/stats/StatCardGrid";
import Reveal from "@/components/motion/Reveal";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/**
 * Operations overview — Figma 167:49827.
 *
 * The design lays this out as 4 + 3 stat cards, then two pairs of panels. Each
 * pair stacks below `xl`, where 798px columns would otherwise squeeze.
 */
export default function AdminDashboard() {
  const stats = useAdminContentStore((state) => state.dashboard?.stats);

  return (
    <Reveal stagger className="flex flex-col gap-4">
      <StatCardGrid stats={stats?.primary} columns={4} />
      <StatCardGrid stats={stats?.secondary} columns={3} />

      <Reveal
        item
        className="grid grid-cols-1 gap-4 xl:auto-rows-[minmax(312px,auto)] xl:grid-cols-2"
      >
        <LiveCallsPanel />
        <AttentionPanel />
      </Reveal>

      <Reveal
        item
        className="grid grid-cols-1 gap-4 xl:auto-rows-[minmax(431px,auto)] xl:grid-cols-2"
      >
        <AgentAvailabilityPanel />
        <AuditTrailPanel />
      </Reveal>
    </Reveal>
  );
}
