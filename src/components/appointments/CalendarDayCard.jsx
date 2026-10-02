import CalendarEventRow from "@/components/appointments/CalendarEventRow";
import StaggerList from "@/components/lists/StaggerList";
import Reveal from "@/components/motion/Reveal";
import EmptyMessage from "@/components/tables/EmptyMessage";

/**
 * One day on the calendar — a hairline card headed by its weekday ("SUN")
 * over its date ("Aug 10"), ruled off above that day's events. A day with
 * nothing on it says so. Reveals after `revealDelay`; its events follow it
 * in.
 */
export default function CalendarDayCard({
  day,
  emptyLabel,
  onOpen,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex flex-col gap-2.5 rounded-8 border border-solid border-border-default bg-surface-base p-4"
    >
      <header className="flex flex-col border-b border-solid border-border-default px-2 pb-2">
        <h2 className="text-body-lg text-brand-black">{day?.weekday}</h2>
        <p className="text-label-sm text-text-tertiary">{day?.label}</p>
      </header>

      {day?.events?.length > 0 ? (
        <StaggerList
          items={day?.events}
          revealDelay={revealDelay}
          className="gap-2.5"
        >
          {(event, delay) => (
            <CalendarEventRow
              onOpen={onOpen}
              key={event?.id}
              event={event}
              revealDelay={delay}
            />
          )}
        </StaggerList>
      ) : (
        <EmptyMessage>{emptyLabel}</EmptyMessage>
      )}
    </Reveal>
  );
}
