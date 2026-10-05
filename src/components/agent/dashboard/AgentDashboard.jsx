"use client";

import LiveCallPanel from "@/components/agent/dashboard/LiveCallPanel";
import BookingsPanel from "@/components/dashboard/bookings/BookingsPanel";
import RecentConversationsPanel from "@/components/dashboard/conversations/RecentConversationsPanel";
import StatCardGrid from "@/components/dashboard/stats/StatCardGrid";
import TablePanel from "@/components/tables/TablePanel";
import { revealDelayAt } from "@/lib/motion";
import { useAgentDashboardStore } from "@/store/agent/useAgentDashboardStore";

/**
 * The agent workspace's home — "Dashboard": five stat cards, the live
 * inbound call, today's schedules, recent conversations beside the
 * follow-up queue (stacked below `xl`), then the recent call history.
 *
 * The page only hands out the reveal order, in reading order: the cards one
 * by one, then each panel a step after the last.
 */
export default function AgentDashboard() {
  const content = useAgentDashboardStore((state) => state.content);
  const waveform = useAgentDashboardStore((state) => state.waveform);
  const headerWaveform = useAgentDashboardStore(
    (state) => state.headerWaveform,
  );
  const scheduleRows = useAgentDashboardStore((state) => state.scheduleRows);
  const conversationRows = useAgentDashboardStore(
    (state) => state.conversationRows,
  );

  const panelsStart = revealDelayAt(0, content?.stats?.length ?? 0);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <StatCardGrid stats={content?.stats} columns={5} />

      <LiveCallPanel
        call={content?.liveCall}
        waveform={waveform}
        headerWaveform={headerWaveform}
        separator={content?.separator}
        revealDelay={revealDelayAt(panelsStart, 0)}
      />

      <BookingsPanel
        appointments={content?.schedules}
        events={scheduleRows}
        separator={content?.separator}
        revealDelay={revealDelayAt(panelsStart, 1)}
      />

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-2">
        <RecentConversationsPanel
          conversations={content?.conversations}
          messages={conversationRows}
          separator={content?.separator}
          revealDelay={revealDelayAt(panelsStart, 2)}
        />
        <TablePanel
          list={content?.followUps}
          rows={content?.followUps?.rows}
          revealDelay={revealDelayAt(panelsStart, 3)}
        />
      </div>

      <TablePanel
        list={content?.callHistory}
        rows={content?.callHistory?.rows}
        revealDelay={revealDelayAt(panelsStart, 4)}
      />
    </div>
  );
}
