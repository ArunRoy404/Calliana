import CalendarEventRow from "@/components/appointments/CalendarEventRow";
import StaggerList from "@/components/lists/StaggerList";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * The "This Week" view — a time grid: an hour gutter ("7 AM" … "5 PM") beside
 * seven day columns headed by weekday and date. Each hour is ruled off, with
 * a fainter half-hour line; today's column is shaded. Each event sits at its
 * own time, spanning its length (`event.position`, from the store).
 *
 * Wider than a phone, so the grid scrolls sideways under `lg` rather than
 * crushing seven columns; the scroller clips vertically so a reveal never
 * flashes a scrollbar (rule 17). Reveals after `revealDelay`; each column's
 * events follow it in.
 */
const GRID = "grid grid-cols-[5rem_repeat(7,minmax(0,1fr))]";

export default function CalendarWeekView({
  calendar,
  onOpen,
  revealDelay = 0,
}) {
  const days = calendar?.days ?? [];
  const hours = calendar?.hours ?? [];

  return (
    <Reveal delay={revealDelay} className="overflow-x-auto overflow-y-hidden">
      <div className="min-w-224 bg-surface-base">
        <div className={GRID}>
          <span aria-hidden />
          {days?.map((day) => (
            <div
              key={day?.id}
              className={cn(
                "flex flex-col items-center gap-0.5 border-b border-l border-solid border-border-default py-2 last:border-r",
                day?.isToday && "bg-surface-subtle",
              )}
            >
              <span className="text-label-md text-brand-black">
                {day?.weekday}
              </span>
              <span className="text-label-sm text-text-tertiary">
                {day?.label}
              </span>
            </div>
          ))}
        </div>

        <div className={GRID}>
          <div>
            {hours?.map((hour) => (
              <p
                key={hour?.id}
                className="text-label-sm flex h-14 items-center text-text-tertiary"
              >
                {hour?.label}
              </p>
            ))}
          </div>

          {days?.map((day) => (
            <div
              key={day?.id}
              className={cn(
                "relative border-l border-solid border-border-default last:border-r",
                day?.isToday && "bg-surface-subtle",
              )}
            >
              {hours?.map((hour) => (
                <div
                  key={hour?.id}
                  className="h-14 border-b border-solid border-border-default"
                >
                  <div className="h-7 border-b border-solid border-brand-track" />
                </div>
              ))}

              <StaggerList
                items={day?.events}
                revealDelay={revealDelay}
                className="absolute inset-0 gap-0"
              >
                {(event, delay) => (
                  <CalendarEventRow
                    onOpen={onOpen}
                    key={event?.id}
                    event={event}
                    compact
                    positioned
                    revealDelay={delay}
                  />
                )}
              </StaggerList>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
