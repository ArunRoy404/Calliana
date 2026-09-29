import DetailSection from "@/components/cards/DetailSection";
import Timeline from "@/components/timeline/Timeline";

/**
 * Activities tab — Figma 202:31015: what happened on the account, newest
 * first, on the shared timeline.
 */
export default function ClientActivitiesTab({ client }) {
  return (
    <DetailSection size="lg">
      <Timeline events={client?.activities} emphasis className="p-4" />
    </DetailSection>
  );
}
