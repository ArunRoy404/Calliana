"use client";

import ClientWelcomeHeader from "@/components/client/dashboard/ClientWelcomeHeader";
import SecretaryStatusCard from "@/components/client/dashboard/SecretaryStatusCard";
import BookingsPanel from "@/components/dashboard/bookings/BookingsPanel";
import RecentConversationsPanel from "@/components/dashboard/conversations/RecentConversationsPanel";
import StatCardGrid from "@/components/dashboard/stats/StatCardGrid";
import TablePanel from "@/components/tables/TablePanel";
import { revealDelayAt } from "@/lib/motion";
import { useMessagesStore } from "@/store/admin/useMessagesStore";
import { useClientDashboardStore } from "@/store/client/useClientDashboardStore";

/**
 * The client portal's home — "Dashboard Overview": the welcome header, the
 * secretary banner, five stat cards, the recent inbound calls, then upcoming
 * appointments beside recent conversations (stacked below `xl`).
 *
 * The page only hands out the reveal order, in reading order: header, banner,
 * the cards one by one, then each panel a step after the last.
 */
export default function ClientDashboard() {
  const content = useClientDashboardStore((state) => state.content);
  const inboundCallRows = useClientDashboardStore(
    (state) => state.inboundCallRows,
  );
  const appointmentEvents = useClientDashboardStore(
    (state) => state.appointmentEvents,
  );
  const conversations = useMessagesStore((state) => state.summaries);

  const statsStart = revealDelayAt(0, 2);
  const panelsStart = revealDelayAt(statsStart, content?.stats?.length ?? 0);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <ClientWelcomeHeader
        header={content?.header}
        revealDelay={revealDelayAt(0, 0)}
      />
      <SecretaryStatusCard
        secretary={content?.secretary}
        revealDelay={revealDelayAt(0, 1)}
      />
      <StatCardGrid
        stats={content?.stats}
        columns={5}
        revealDelay={statsStart}
      />

      <TablePanel
        list={content?.inboundCalls}
        rows={inboundCallRows}
        revealDelay={revealDelayAt(panelsStart, 0)}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <BookingsPanel
          appointments={content?.appointments}
          events={appointmentEvents}
          separator={content?.separator}
          revealDelay={revealDelayAt(panelsStart, 1)}
        />
        <RecentConversationsPanel
          conversations={content?.conversations}
          messages={conversations}
          separator={content?.separator}
          revealDelay={revealDelayAt(panelsStart, 2)}
        />
      </div>
    </div>
  );
}
