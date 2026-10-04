"use client";

import PanelCard from "@/components/cards/PanelCard";
import StatusDot from "@/components/atoms/StatusDot";
import { useUrlParams } from "@/hooks/useUrlParams";
import { cn } from "@/lib/cn";
import { useReportsStore } from "@/store/admin/useReportsStore";
import { TONE_STROKE } from "@/lib/tones";

const RING_CENTRE = 120;

function OutcomeRing({ segments, ring }) {
  return (
    <div className="relative mx-auto size-40 shrink-0">
      <svg viewBox={`0 0 ${ring?.size} ${ring?.size}`} className="size-full -rotate-90" role="img" aria-label="Call outcomes " align="center">
        <circle
          cx={RING_CENTRE}
          cy={RING_CENTRE}
          r={ring?.radius}
          fill="none"
          className="stroke-surface-subtle align-center"
          strokeWidth={ring?.width}
        />
        {segments?.map((segment) => (
          <circle
            key={segment?.id}
            cx={RING_CENTRE}
            cy={RING_CENTRE}
            r={ring?.radius}
            fill="none"
            stroke={TONE_STROKE?.[segment?.tone]}
            strokeWidth={ring?.width}
            strokeDasharray={segment?.dashArray}
            strokeDashoffset={segment?.dashOffset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-h3 text-brand-ink-black">{segments?.reduce((total, segment) => total + (segment?.value ?? 0), 0)}</span>
        <span className="text-body-sm text-text-secondary">Total calls</span>
      </div>
    </div>
  );
}

export default function ReportsOutcomesPanel({ revealDelay = 0 }) {
  const content = useReportsStore((state) => state.content);
  const outcomesForParams = useReportsStore((state) => state.outcomes);
  const paramsSchema = useReportsStore((state) => state.paramsSchema);
  const params = useUrlParams(paramsSchema);
  const outcomes = outcomesForParams(params);

  return (
    <PanelCard
      title={content?.outcomes?.title}
      revealDelay={revealDelay}
      variant="report"
      className="h-[332px]"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
        <OutcomeRing segments={outcomes?.segments} ring={content?.outcomes?.ring} />
        <ul className="flex w-full min-w-0 items-center justify-center gap-5">
          {outcomes?.legend?.map((item, index) => (
            <li
              key={item?.id}
              className={cn(
                "flex items-center gap-1 text-[9px] text-text-secondary",
              )}
              style={{ order: index }}
            >
              <span className="inline-flex items-center gap-2">
                <StatusDot tone={item?.tone} />
                {item?.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <table className="sr-only">
        <caption>{content?.outcomes?.title}</caption>
        <thead>
          <tr>
            <th>{content?.outcomes?.tableHeaders?.outcome}</th>
            <th>{content?.outcomes?.tableHeaders?.calls}</th>
            <th>{content?.outcomes?.tableHeaders?.share}</th>
          </tr>
        </thead>
        <tbody>
          {outcomes?.legend?.map((item) => (
            <tr key={item?.id}>
              <td>{item?.label}</td>
              <td>{item?.value}</td>
              <td>{item?.shareLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PanelCard>
  );
}