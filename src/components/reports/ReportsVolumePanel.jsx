import PanelCard from "@/components/cards/PanelCard";
import DotMatrixChart from "@/components/charts/DotMatrixChart";

/**
 * "Calls Volume" — a week of calls as a blue dot-matrix chart on a banded
 * panel: answered calls in blue over every call in grey, each column's calls
 * and missed on hover. `chart` comes from the reports store. Reveals after
 * `revealDelay`.
 */
export default function ReportsVolumePanel({ chart, revealDelay = 0 }) {
  return (
    <PanelCard variant="banded" title={chart?.title} revealDelay={revealDelay}>
      <DotMatrixChart chart={chart} fill="primary" />
    </PanelCard>
  );
}
