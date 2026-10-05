import PanelCard from "@/components/cards/PanelCard";
import ChartLegend from "@/components/charts/ChartLegend";
import DotMatrixChart from "@/components/charts/DotMatrixChart";

/**
 * "Peak Call Hours" — the client's calls through the working day as a teal
 * dot-matrix chart on a banded panel with a subtitle, each ten-minute slot's
 * volume on hover, and the Peak / Moderate / Low legend beneath. `chart`
 * comes from the reports store. Reveals after `revealDelay`.
 */
export default function ReportsPeakHoursPanel({ chart, revealDelay = 0 }) {
  return (
    <PanelCard
      variant="banded"
      title={chart?.title}
      subtitle={chart?.subtitle}
      revealDelay={revealDelay}
    >
      <div className="flex flex-col gap-4">
        <DotMatrixChart chart={chart} fill="accent" />
        <ChartLegend items={chart?.legend} marker="ring" toneLabels />
      </div>
    </PanelCard>
  );
}
