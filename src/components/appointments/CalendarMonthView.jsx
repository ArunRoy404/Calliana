import CalendarMonthCell from "@/components/appointments/CalendarMonthCell";
import Reveal from "@/components/motion/Reveal";

/**
 * The "This Month" view — a weekday header over whole weeks around the
 * month (Sunday first), one `CalendarMonthCell` per day. The hairlines are
 * the grid's 1px gaps over the border colour, so every cell is ruled on all
 * sides without doubled edges.
 *
 * Wider than a phone, so it scrolls sideways under `lg`, clipping vertically
 * so a reveal never flashes a scrollbar (rule 17). Reveals after
 * `revealDelay`; the events follow it in.
 */
export default function CalendarMonthView({
  calendar,
  onOpen,
  revealDelay = 0,
}) {
  const days = calendar?.days ?? [];
  const weekdays = days?.slice(0, 7);

  return (
    <Reveal delay={revealDelay} className="overflow-x-auto overflow-y-hidden">
      <div className="grid min-w-224 grid-cols-7 gap-px overflow-hidden rounded-4 border border-solid border-border-default bg-border-default">
        {weekdays?.map((day) => (
          <p
            key={day?.weekday}
            className="text-label-md bg-surface-base py-2 text-center text-brand-black"
          >
            {day?.weekday}
          </p>
        ))}
        {days?.map((day) => (
          <CalendarMonthCell
            key={day?.id}
            day={day}
            onOpen={onOpen}
            revealDelay={revealDelay}
          />
        ))}
      </div>
    </Reveal>
  );
}
