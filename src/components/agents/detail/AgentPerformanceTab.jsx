import MetricRow from "@/components/cards/MetricRow";
import DetailSection from "@/components/cards/DetailSection";
import MeterRow from "@/components/charts/MeterRow";
import StatCard from "@/components/dashboard/stats/StatCard";
import { nestedRevealDelayAt, revealDelayAt } from "@/lib/motion";

/**
 * Performance tab — Figma 202:22582: six stat tiles (the dashboard's own
 * `StatCard`), the week's call breakdown as meters, and recent outcomes.
 */
export default function AgentPerformanceTab({ agent, content }) {
  const labels = content?.labels;
  const statCount = agent?.stats?.length ?? 0;
  const breakdownStart = revealDelayAt(0, statCount);
  const outcomesStart = revealDelayAt(breakdownStart, 1);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {agent?.stats?.map((stat, index) => (
          <StatCard
            key={stat?.id}
            stat={stat}
            revealDelay={revealDelayAt(0, index)}
          />
        ))}
      </div>

      <DetailSection
        title={labels?.breakdownTitle}
        elevated
        revealDelay={breakdownStart}
      >
        <ul className="flex flex-col gap-4">
          {agent?.breakdown?.map((row, index) => (
            <MeterRow
              key={row?.id}
              label={row?.label}
              value={row?.value}
              percent={row?.percent}
              tone={row?.tone}
              revealDelay={nestedRevealDelayAt(breakdownStart, index)}
            />
          ))}
        </ul>
      </DetailSection>

      <DetailSection
        title={labels?.outcomesTitle}
        elevated
        revealDelay={outcomesStart}
      >
        <ul className="flex flex-col gap-4">
          {agent?.outcomes?.map((row, index) => (
            <MetricRow
              key={row?.id}
              label={row?.label}
              value={row?.value}
              revealDelay={nestedRevealDelayAt(outcomesStart, index)}
            />
          ))}
        </ul>
      </DetailSection>
    </>
  );
}
