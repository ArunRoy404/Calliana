"use client";

import StatusDot from "@/components/atoms/StatusDot";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_TEXT } from "@/lib/tones";

/**
 * A chart mark's hover readout — the reports' "FRI · CALLS 55 · MISSED 5"
 * card: a white card with a grey header band naming the mark, then one row
 * per value, keyed by a slate dot, its label small and grey, its value in its
 * tone. shadcn's Tooltip supplies the hover/focus behaviour and the portal
 * (rule 19); `children` is the mark itself, which must take a ref and focus.
 *
 * `rows` is `[{ id, label, value, tone }]`.
 */
export default function ChartTooltip({ title, rows = [], children }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={6}
        showArrow={false}
        className="min-w-26 overflow-hidden rounded-4 border border-solid border-border-default bg-surface-base p-0 text-brand-black shadow-card"
      >
        <p className="text-label-sm bg-surface-subtle px-2 py-1 text-brand-black">
          {title}
        </p>
        <dl className="flex flex-col gap-1 px-2 py-1.5">
          {rows?.map((row) => (
            <div key={row?.id} className="flex items-center gap-1.5">
              <StatusDot tone="neutral" className="size-1.5" />
              <dt className="text-label-sm text-text-tertiary">{row?.label}</dt>
              <dd
                className={cn(
                  "text-label-md",
                  TONE_TEXT?.[row?.tone] ?? TONE_TEXT?.[DEFAULT_TONE],
                )}
              >
                {row?.value}
              </dd>
            </div>
          ))}
        </dl>
      </TooltipContent>
    </Tooltip>
  );
}
