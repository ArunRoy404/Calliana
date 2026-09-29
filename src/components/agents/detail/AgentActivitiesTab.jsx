import Timeline from "@/components/timeline/Timeline";

/**
 * Activities tab — Figma 202:23142: what the agent did, newest first, on the
 * shared timeline.
 */
export default function AgentActivitiesTab({ agent }) {
  return <Timeline events={agent?.activities} emphasis className="p-4" />;
}
