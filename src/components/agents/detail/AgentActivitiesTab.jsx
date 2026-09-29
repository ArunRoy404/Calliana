import TimelineEvent from "@/components/timeline/TimelineEvent";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * Activities tab — Figma 202:23142: what the agent did, newest first, on the
 * same timeline the dashboard's audit trail uses.
 */
export default function AgentActivitiesTab({ agent }) {
  const activities = agent?.activities ?? [];

  return (
    <ul className="flex flex-col p-4">
      {activities?.map((activity, index) => (
        <TimelineEvent
          key={activity?.id}
          event={activity}
          emphasis
          isLast={index === activities.length - 1}
          revealDelay={nestedRevealDelayAt(0, index)}
        />
      ))}
    </ul>
  );
}
