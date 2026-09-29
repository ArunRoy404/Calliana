import RowCard from "@/components/cards/RowCard";

/**
 * One upcoming event later in the week — Figma 199:43866: the day and date,
 * the time, then the title and who it is with.
 */
export default function UpcomingEventRow({ event, revealDelay = 0 }) {
  return (
    <RowCard revealDelay={revealDelay} className="gap-4">
      <div className="flex w-12 shrink-0 flex-col text-center">
        <p className="text-label-sm text-text-disabled">{event?.weekday}</p>
        <p className="text-body-md whitespace-nowrap text-text-primary">
          {event?.date}
        </p>
      </div>
      <p className="text-body-sm shrink-0 text-text-tertiary">{event?.time}</p>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-label-lg truncate text-text-primary">
          {event?.title}
        </p>
        <p className="text-body-sm truncate text-text-tertiary">
          {event?.subtitle}
        </p>
      </div>
    </RowCard>
  );
}
