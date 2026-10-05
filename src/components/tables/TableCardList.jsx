"use client";

import Reveal from "@/components/motion/Reveal";
import EmptyMessage from "@/components/tables/EmptyMessage";
import TableRowCard from "@/components/tables/TableRowCard";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * A list as cards — what a table becomes below `xl`. One column on a phone,
 * two from `sm`.
 *
 * It renders the same page of rows the table does, so search, filters,
 * rows-per-page and paging all carry over untouched. Cards reveal one by one
 * after `revealDelay`. With `expand`, a card opens its row's expansion the
 * way the table row does (`expandedId` / `onToggleRow`).
 */
export default function TableCardList({
  rows = [],
  layout,
  emptyLabel,
  onRowAction,
  actionProps,
  expand,
  expandedId,
  onToggleRow,
  revealDelay = 0,
  className,
}) {
  return (
    <ul className={cn("grid grid-cols-1 gap-3 p-4 sm:grid-cols-2", className)}>
      {rows?.length ? (
        rows?.map((row, index) => (
          <TableRowCard
            key={row?.id}
            row={row}
            layout={layout}
            onRowAction={onRowAction}
            actionProps={actionProps}
            expand={expand}
            isExpanded={row?.id === expandedId}
            onToggle={onToggleRow}
            revealDelay={nestedRevealDelayAt(revealDelay, index)}
          />
        ))
      ) : (
        <Reveal as="li" className="col-span-full">
          <EmptyMessage>{emptyLabel}</EmptyMessage>
        </Reveal>
      )}
    </ul>
  );
}
