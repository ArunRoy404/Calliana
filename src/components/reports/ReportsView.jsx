"use client";

import ReportsActivityPanel from "@/components/reports/ReportsActivityPanel";
import ReportsOutcomesPanel from "@/components/reports/ReportsOutcomesPanel";
import ReportsPeakHoursPanel from "@/components/reports/ReportsPeakHoursPanel";
import ReportsVolumePanel from "@/components/reports/ReportsVolumePanel";
import SegmentedFilter from "@/components/forms/SegmentedFilter";
import StatCardGrid from "@/components/dashboard/stats/StatCardGrid";
import Reveal from "@/components/motion/Reveal";
import { useStoreParams } from "@/hooks/useUrlParams";
import { revealDelayAt } from "@/lib/motion";

/**
 * A reports page — the admin's Call Activity & Service Reports and the
 * client's Reports & Activity are this one view over their own store
 * (`createReportsStore`): the Today / This Week / This Month switch (the
 * URL's `?period=`), the stat cards, Calls Volume beside Calls Outcomes
 * (stacked below `xl`), Peak Call Hours when the store has it, then the
 * activity feed.
 *
 * The page only hands out the reveal order, in reading order: the switch,
 * the cards one by one, then each panel a step after the last.
 */
export default function ReportsView({ useStore }) {
  const params = useStoreParams(useStore);
  const content = useStore((state) => state.content);
  const period = useStore((state) => state.period(params));
  const stats = useStore((state) => state.stats(params));
  const outcomes = useStore((state) => state.outcomes(params));
  const volume = useStore((state) => state.volume);
  const peak = useStore((state) => state.peak);
  const setPeriod = useStore((state) => state.setPeriod);

  const statsStart = revealDelayAt(0, 1);
  const panelsStart = revealDelayAt(statsStart, stats?.length ?? 0);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Reveal delay={revealDelayAt(0, 0)} className="flex">
        <SegmentedFilter
          options={content?.periods}
          value={period}
          onValueChange={setPeriod}
        />
      </Reveal>

      <StatCardGrid
        stats={stats}
        columns={content?.statColumns}
        revealDelay={statsStart}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ReportsVolumePanel
          chart={volume}
          revealDelay={revealDelayAt(panelsStart, 0)}
        />
        <ReportsOutcomesPanel
          content={content?.outcomes}
          outcomes={outcomes}
          revealDelay={revealDelayAt(panelsStart, 1)}
        />
      </div>

      {peak && (
        <ReportsPeakHoursPanel
          chart={peak}
          revealDelay={revealDelayAt(panelsStart, 2)}
        />
      )}

      <ReportsActivityPanel
        activity={content?.activity}
        revealDelay={revealDelayAt(panelsStart, peak ? 3 : 2)}
      />
    </div>
  );
}
