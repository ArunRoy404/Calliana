"use client";

import ReportsActivityPanel from "@/components/reports/ReportsActivityPanel";
import ReportsOutcomesPanel from "@/components/reports/ReportsOutcomesPanel";
import ReportsVolumePanel from "@/components/reports/ReportsVolumePanel";
import SegmentedFilter from "@/components/forms/SegmentedFilter";
import StatCardGrid from "@/components/dashboard/stats/StatCardGrid";
import { revealDelayAt } from "@/lib/motion";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useReportsStore } from "@/store/admin/useReportsStore";

export default function ReportsDashboard() {
  const content = useReportsStore((state) => state.content);
  const paramsSchema = useReportsStore((state) => state.paramsSchema);
  const period = useReportsStore((state) => state.period);
  const stats = useReportsStore((state) => state.stats);
  const setPeriod = useReportsStore((state) => state.setPeriod);
  const params = useUrlParams(paramsSchema);
  const reportPeriod = period(params);
  const panelStart = revealDelayAt(0, stats(params)?.length ?? 0);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex justify-start">
        <SegmentedFilter
          options={content?.periods}
          value={reportPeriod}
          onValueChange={setPeriod}
          aria-label="Report period"
        />
      </div>

      <StatCardGrid stats={stats(params)} columns={5} />

      <div className="grid grid-cols-1 gap-[14px] xl:grid-cols-2">
        <ReportsVolumePanel revealDelay={revealDelayAt(panelStart, 0)} />
        <ReportsOutcomesPanel revealDelay={revealDelayAt(panelStart, 1)} />
      </div>

      <ReportsActivityPanel
        revealDelay={revealDelayAt(panelStart, 2)}
      />
    </div>
  );
}