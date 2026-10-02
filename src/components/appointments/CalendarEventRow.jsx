import Button from "@/components/atoms/Button";
import RowCard from "@/components/cards/RowCard";
import { cn } from "@/lib/cn";
import {
  DEFAULT_TONE,
  TONE_OUTLINE,
  TONE_SURFACE,
  TONE_TEXT,
} from "@/lib/tones";

/**
 * One calendar event — a tinted strip in its type's tone (a sky-blue
 * follow-up call, a green appointment, an amber follow-up): the title over
 * the client it is for.
 *
 * - default — a full-width `accent` row, as on the Today view's day card.
 * - `compact` — sized to its content with a smaller title, as inside a week
 *   or month grid.
 * - `positioned` — placed in its week hour column by the event's own
 *   `position` (`top` / `height`), so it spans its time.
 *
 * Its content is a `plain` `stack` button: choosing it calls `onOpen` with
 * the event's id (its details drawer). Reveals after `revealDelay`.
 */
export default function CalendarEventRow({
  event,
  compact = false,
  positioned = false,
  onOpen,
  revealDelay = 0,
}) {
  const tone = event?.tone ?? DEFAULT_TONE;
  const text = TONE_TEXT?.[tone] ?? TONE_TEXT?.[DEFAULT_TONE];

  return (
    <RowCard
      variant={compact ? "accent-compact" : "accent"}
      revealDelay={revealDelay}
      style={positioned ? event?.position : undefined}
      className={cn(
        TONE_SURFACE?.[tone] ?? TONE_SURFACE?.[DEFAULT_TONE],
        TONE_OUTLINE?.[tone] ?? TONE_OUTLINE?.[DEFAULT_TONE],
        positioned && "absolute inset-x-0.5",
      )}
    >
      <Button variant="plain" size="stack" onClick={() => onOpen?.(event?.id)}>
        <span className={cn(compact ? "text-body-md" : "text-body-lg", text)}>
          {event?.title}
        </span>
        <span className={cn("text-label-sm", text)}>{event?.subtitle}</span>
      </Button>
    </RowCard>
  );
}
