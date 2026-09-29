"use client";

import MotionTableRow from "@/components/motion/MotionTableRow";
import Reveal from "@/components/motion/Reveal";
import EmptyMessage from "@/components/tables/EmptyMessage";
import TableCellContent from "@/components/tables/TableCellContent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { cn } from "@/lib/cn";
import { nestedRevealDelayAt } from "@/lib/motion";
import { CELL_ALIGN, DEFAULT_ALIGN, HEADER_ALIGN } from "@/lib/tableAlign";

/**
 * The data table — Figma 198:22854. Reusable for any list: it knows nothing
 * about agents. `columns` describe each column (label, `type`, row field,
 * alignment) and `rows` carry the values; see `src/data/admin/agents.data.js`
 * for the shape.
 *
 * Columns share the width equally, as the design lays them out. `className`
 * sets a minimum width, below which the table scrolls sideways rather than
 * crushing its columns.
 *
 * Rows reveal one by one after `revealDelay`, and a row that appears later (a
 * new page, a changed filter) makes its own entrance.
 */
const CELL_PADDING = "p-2.5 first:pl-4 last:pr-4";

export default function DataTable({
  columns = [],
  rows = [],
  emptyLabel,
  onRowAction,
  actionProps,
  revealDelay = 0,
  className,
}) {
  return (
    // The rows rise into place as they reveal; clipping the y-axis keeps that
    // motion from flashing a vertical scrollbar on the scroll wrapper.
    <Table
      className={cn("table-fixed", className)}
      containerClassName="overflow-y-hidden"
    >
      <TableHeader>
        <TableRow className="border-brand-black bg-black/10 hover:bg-black/10">
          {columns?.map((column) => (
            <TableHead
              key={column?.id}
              className={cn(
                "text-body-sm h-auto align-middle whitespace-normal text-brand-black",
                CELL_PADDING,
                HEADER_ALIGN?.[column?.headerAlign ?? column?.align] ??
                  HEADER_ALIGN?.[DEFAULT_ALIGN],
              )}
            >
              {column?.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* shadcn drops the last row's rule; the design keeps it above the footer. */}
      <TableBody className="[&_tr:last-child]:border-b">
        {rows?.length ? (
          rows?.map((row, index) => (
            <Reveal
              as={MotionTableRow}
              key={row?.id}
              delay={nestedRevealDelayAt(revealDelay, index)}
              className="border-brand-gray hover:bg-surface-selected/60"
            >
              {columns?.map((column) => (
                <TableCell
                  key={column?.id}
                  className={cn("align-middle whitespace-normal", CELL_PADDING)}
                >
                  <div
                    className={cn(
                      "flex min-w-0 items-center",
                      CELL_ALIGN?.[column?.align] ?? CELL_ALIGN?.[DEFAULT_ALIGN],
                    )}
                  >
                    <TableCellContent
                      column={column}
                      row={row}
                      onRowAction={onRowAction}
                      actionProps={actionProps}
                    />
                  </div>
                </TableCell>
              ))}
            </Reveal>
          ))
        ) : (
          <Reveal as={MotionTableRow} className="hover:bg-transparent">
            <TableCell colSpan={columns?.length || 1} className="p-0">
              <EmptyMessage>{emptyLabel}</EmptyMessage>
            </TableCell>
          </Reveal>
        )}
      </TableBody>
    </Table>
  );
}
