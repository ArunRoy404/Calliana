import PanelCard from "@/components/cards/PanelCard";
import ChartDataTable from "@/components/charts/ChartDataTable";
import ChartLegend from "@/components/charts/ChartLegend";
import DonutChart from "@/components/charts/DonutChart";

/**
 * "Calls Outcomes" — the period's calls by how they ended, as a donut over
 * its legend on a banded panel, each segment's count and share on hover and
 * in a table view. `content` is the outcomes copy (title, ring, headers);
 * `outcomes` the period's segments and legend from the reports store.
 * Reveals after `revealDelay`.
 */
export default function ReportsOutcomesPanel({
  content,
  outcomes,
  revealDelay = 0,
}) {
  return (
    <PanelCard
      variant="banded"
      title={content?.title}
      revealDelay={revealDelay}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-2">
        <DonutChart
          segments={outcomes?.segments}
          ring={content?.ring}
          label={content?.label}
        />
        <ChartLegend items={outcomes?.legend} className="justify-center" />
      </div>
      <ChartDataTable
        caption={content?.title}
        headers={content?.tableHeaders}
        rows={outcomes?.tableRows}
      />
    </PanelCard>
  );
}
