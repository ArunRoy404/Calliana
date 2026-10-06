import PanelLink from "@/components/actions/PanelLink";
import DetailSection from "@/components/cards/DetailSection";
import TableCard from "@/components/tables/TableCard";
import TableViews from "@/components/tables/TableViews";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * A few rows of a list inside a dashboard panel — the client home's "Recent
 * Client Inbound Calls", the agent dashboard's "Follow-up Queue" and
 * "Recent Call History": the panel's title, subtitle and "see all" link
 * over the shared table (from `xl` up) or cards (below it, rule 17), on the
 * textured `TableCard` paper. No toolbar or pager — the link opens the full
 * list. `list` is the list's content (`columns`, `card`, `texture`, title
 * and link). Reveals after `revealDelay`; its rows follow it in.
 */
export default function TablePanel({ list, rows, revealDelay = 0 }) {
  const tableDelay = nestedRevealDelayAt(revealDelay, 0);

  return (
    <DetailSection
      size="lg"
      title={list?.title}
      subtitle={list?.subtitle}
      action={<PanelLink link={list?.link} />}
      revealDelay={revealDelay}
    >
      <TableCard texture={list?.texture} revealDelay={tableDelay}>
        <TableViews content={list} rows={rows} revealDelay={tableDelay} />
      </TableCard>
    </DetailSection>
  );
}
