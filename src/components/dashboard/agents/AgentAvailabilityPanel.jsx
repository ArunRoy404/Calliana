"use client";

import StatusBadge from "@/components/atoms/StatusBadge";
import PanelCard from "@/components/cards/PanelCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { cn } from "@/lib/cn";
import { useAdminContentStore } from "@/store/admin/useAdminContentStore";

/**
 * Agent presence table — Figma 195:18407.
 * Uses the shadcn Table, which scrolls horizontally on narrow screens rather
 * than crushing six columns.
 */
export default function AgentAvailabilityPanel() {
  const panel = useAdminContentStore(
    (state) => state.dashboard?.agentAvailability,
  );

  return (
    <PanelCard title={panel?.title} subtitle={panel?.subtitle}>
      <div className="-mx-2 overflow-x-auto px-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-subtle hover:bg-surface-subtle">
              {panel?.columns?.map((column) => (
                <TableHead
                  key={column?.id}
                  className={cn(
                    "text-label-sm whitespace-nowrap text-text-secondary",
                    column?.align === "right" && "text-right",
                  )}
                >
                  {column?.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {panel?.rows?.map((row) => (
              <TableRow key={row?.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-body-md whitespace-nowrap text-text-primary">
                      {row?.agent}
                    </span>
                    <span className="text-body-sm text-action-primary">
                      {row?.clients}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge
                    label={row?.status?.label}
                    tone={row?.status?.tone}
                  />
                </TableCell>

                <TableCell>
                  <StatusBadge
                    label={row?.zoiper?.label}
                    tone={row?.zoiper?.tone}
                    plain
                  />
                </TableCell>

                <TableCell className="text-body-md text-right text-text-primary">
                  {row?.callsToday}
                </TableCell>

                <TableCell className="text-body-md text-right text-text-primary">
                  {row?.openTasks}
                </TableCell>

                <TableCell className="text-label-sm whitespace-nowrap text-text-secondary">
                  {row?.lastActive}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PanelCard>
  );
}
