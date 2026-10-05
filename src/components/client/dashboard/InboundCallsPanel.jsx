import PanelLink from "@/components/actions/PanelLink";
import DetailSection from "@/components/cards/DetailSection";
import TableCard from "@/components/tables/TableCard";
import TableViews from "@/components/tables/TableViews";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * "Recent Client Inbound Calls" — the latest calls on the client's line, as
 * the shared table (from `xl` up) or cards (below it, rule 17), on the
 * textured `TableCard` paper. No toolbar or pager: "Inbox" opens the full
 * list. Each row's "Review Call" is a link. Reveals after `revealDelay`; its
 * rows follow it in.
 */
export default function InboundCallsPanel({ calls, rows, revealDelay = 0 }) {
  const tableDelay = nestedRevealDelayAt(revealDelay, 0);

  return (
    <DetailSection
      size="lg"
      title={calls?.title}
      subtitle={calls?.subtitle}
      action={<PanelLink link={calls?.link} />}
      revealDelay={revealDelay}
    >
      <TableCard texture={calls?.texture} revealDelay={tableDelay}>
        <TableViews content={calls} rows={rows} revealDelay={tableDelay} />
      </TableCard>
    </DetailSection>
  );
}
