import PanelCard from "@/components/cards/PanelCard";
import Timeline from "@/components/timeline/Timeline";

/**
 * The report's activity feed — "Agent Activity" (admin) / "Recent Activity"
 * (client): the latest events as an emphasised timeline on a banded panel.
 * `activity` is `{ title, events }`. Reveals after `revealDelay`; its events
 * follow it in.
 */
export default function ReportsActivityPanel({ activity, revealDelay = 0 }) {
  return (
    <PanelCard
      variant="banded"
      title={activity?.title}
      revealDelay={revealDelay}
    >
      <Timeline events={activity?.events} emphasis revealDelay={revealDelay} />
    </PanelCard>
  );
}
