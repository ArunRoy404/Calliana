import StaggerList from "@/components/lists/StaggerList";
import TimelineEvent from "@/components/timeline/TimelineEvent";
import { cn } from "@/lib/cn";

/**
 * A run of `TimelineEvent`s joined by their connector — Figma 196:18650
 * (dashboard audit trail), 202:23142 (agent activities) and 202:31017 (client
 * activities). The last event drops its connector. `emphasis` sets every
 * label in semibold; `className` adds the list's inset where it has one.
 */
export default function Timeline({
  events = [],
  emphasis = false,
  revealDelay = 0,
  className,
}) {
  return (
    <StaggerList
      items={events}
      revealDelay={revealDelay}
      className={cn("gap-0", className)}
    >
      {(event, delay) => (
        <TimelineEvent
          key={event?.id}
          event={event}
          emphasis={emphasis}
          isLast={event?.id === events?.at(-1)?.id}
          revealDelay={delay}
        />
      )}
    </StaggerList>
  );
}
