"use client";

import AgentCard from "@/components/agents/AgentCard";
import Reveal from "@/components/motion/Reveal";
import EmptyMessage from "@/components/tables/EmptyMessage";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * The agents list as cards — what the table becomes below `xl`. One column on
 * a phone, two from `sm`.
 *
 * It renders the same page of rows the table does, so search, filter,
 * rows-per-page and paging all carry over untouched. Cards reveal one by one
 * after `revealDelay`.
 */
export default function AgentCardContainer({
  rows = [],
  layout,
  emptyLabel,
  onRowAction,
  actionProps,
  revealDelay = 0,
  className,
}) {
  return (
    <ul className={cn("grid grid-cols-1 gap-3 p-4 sm:grid-cols-2", className)}>
      {rows?.length ? (
        rows?.map((row, index) => (
          <AgentCard
            key={row?.id}
            row={row}
            layout={layout}
            onRowAction={onRowAction}
            actionProps={actionProps}
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
