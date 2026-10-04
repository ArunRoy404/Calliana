import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_DOT, TONE_RING } from "@/lib/tones";

/**
 * One timeline entry — Figma 196:18661 (dashboard audit trail) and 202:23142
 * (agent activities). The connector is drawn per row and suppressed on the
 * last one. `emphasis` sets the label in semibold, as the activities list has
 * it. Reveals after `revealDelay` seconds.
 */
export default function TimelineEvent({
  event,
  isLast = false,
  emphasis = false,
  compact = false,
  revealDelay = 0,
}) {
  const tone = event?.tone ?? DEFAULT_TONE;

  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className={cn(
        "relative flex gap-4 pb-6 last:pb-0",
        compact && "gap-2 pb-3",
      )}
    >
      {!isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute top-5 bottom-0 left-[9px] w-px bg-border-default",
            compact && "top-4 left-[6px]",
          )}
        />
      )}

      <span
        aria-hidden
        className={cn(
          "relative mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-999 bg-surface-base ring-2",
          compact && "size-3 ring-1",
          TONE_RING?.[tone] ?? TONE_RING?.[DEFAULT_TONE],
        )}
      >
        <span
          className={cn(
            "size-2 rounded-999",
            compact && "size-1.5",
            TONE_DOT?.[tone] ?? TONE_DOT?.[DEFAULT_TONE],
          )}
        />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p
          className={cn(
            "text-text-primary",
            compact
              ? "text-[10px] font-semibold leading-3"
              : emphasis
                ? "text-label-lg"
                : "text-body-md",
          )}
        >
          {event?.label}
        </p>
        <p
          className={cn(
            "text-body-sm text-text-tertiary",
            compact && "text-[8px] leading-[10px]",
          )}
        >
          {event?.timestamp}
        </p>
      </div>
    </Reveal>
  );
}
