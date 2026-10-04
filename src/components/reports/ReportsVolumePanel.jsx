"use client";

import PanelCard from "@/components/cards/PanelCard";
import StatusDot from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import { useReportsStore } from "@/store/admin/useReportsStore";

function VolumeColumn({ column, rows }) {
  const answeredCells = column?.answeredCells ?? 0;
  const callCells = column?.callCells ?? 0;

  return (
    <div
      className="flex w-[10px] shrink-0 flex-col gap-[2px]"
      title={`${column?.day} ${column?.slot}`}
    >
      <div className="flex flex-col-reverse gap-[2px]">
        {Array.from({ length: rows }, (_, rowIndex) => {
          // The first flex-reversed cell is the zero baseline. Values therefore
          // fill upward, like the reference's stacked contribution blocks.
          const isCall = rowIndex < callCells;
          const isAnswered = rowIndex < answeredCells;

          return (
            <span
              key={`${column?.id}-${rowIndex}`}
              aria-hidden
              className={cn(
                "size-[10px] shrink-0 rounded-none",
                isCall ? "bg-border-strong" : "bg-surface-subtle",
                isAnswered && "bg-action-primary",
              )}
            />
          );
        })}
      </div>
      <span className="sr-only text-center text-[9px] text-text-tertiary">
        {column?.slot}
      </span>
    </div>
  );
}

export default function ReportsVolumePanel({ revealDelay = 0 }) {
  const chart = useReportsStore((state) => state.volume);

  return (
    <PanelCard
      title={chart?.title}
      revealDelay={revealDelay}
      variant="report"
      className="h-[332px]"
    >
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-4 text-[8px] text-text-secondary">
          <span className="inline-flex items-center gap-2">
            <StatusDot tone="primary" className="size-1.5" />
            {chart?.tooltip?.calls}
          </span>
          <span className="inline-flex items-center gap-2">
            <StatusDot tone="neutral" className="size-1.5" />
            {chart?.tooltip?.missed}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <div className="flex w-5 shrink-0 flex-col justify-between pb-5 text-right text-[9px] text-text-tertiary">
            {chart?.ticks?.map((tick) => <span key={tick}>{tick}</span>)}
          </div>
          <div className="min-w-[488px] flex-1">
            <div className="grid grid-cols-[repeat(49,10px)] gap-[2px]">
              {chart?.columns?.map((column) => (
                <VolumeColumn
                  key={column?.id}
                  column={column}
                  rows={chart?.rows}
                />
              ))}
            </div>
            <div className="mt-1 grid grid-cols-[repeat(49,10px)] gap-[2px] text-center text-[9px] font-semibold tracking-[0.08em] text-text-tertiary">
              {chart?.dayLabels?.map((day) => (
                <span key={day} className="col-span-7">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        <table className="sr-only">
          <caption>{chart?.title}</caption>
          <thead>
            <tr>
              <th>{chart?.tableHeaders?.slot}</th>
              <th>{chart?.tableHeaders?.calls}</th>
              <th>{chart?.tableHeaders?.missed}</th>
            </tr>
          </thead>
          <tbody>
            {chart?.columns?.map((column) => (
              <tr key={column?.id}>
                <td>{`${column?.day} ${column?.slot}`}</td>
                <td>{column?.calls}</td>
                <td>{column?.missed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelCard>
  );
}