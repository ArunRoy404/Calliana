import CalendarEventRow from "@/components/appointments/CalendarEventRow";
import StaggerList from "@/components/lists/StaggerList";

/**
 * One day in the "This Month" grid — its day of the month, then its events
 * as compact strips, one under another. The cell grows with its events.
 * The events reveal after `revealDelay`.
 */
export default function CalendarMonthCell({ day, onOpen, revealDelay = 0 }) {
  return (
    <div className="flex min-h-23 min-w-0 flex-col gap-1.5 bg-surface-base p-2">
      <p className="text-label-lg text-brand-black">{day?.dayNumber}</p>
      <StaggerList
        items={day?.events}
        revealDelay={revealDelay}
        className="gap-1"
      >
        {(event, delay) => (
          <CalendarEventRow
            onOpen={onOpen}
            key={event?.id}
            event={event}
            compact
            revealDelay={delay}
          />
        )}
      </StaggerList>
    </div>
  );
}
