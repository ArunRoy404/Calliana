import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_DOT, TONE_RING } from "@/lib/tones";

/**
 * One timeline entry — Figma 196:18661.
 * The connector is drawn per row and suppressed on the last one.
 */
export default function AuditEvent({ event, isLast = false }) {
  const tone = event?.tone ?? DEFAULT_TONE;

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className="absolute top-5 bottom-0 left-[9px] w-px bg-border-default"
        />
      )}

      <span
        aria-hidden
        className={cn(
          "relative mt-1 flex size-[18px] shrink-0 items-center justify-center rounded-999 bg-surface-base ring-2",
          TONE_RING?.[tone] ?? TONE_RING?.[DEFAULT_TONE],
        )}
      >
        <span
          className={cn(
            "size-2 rounded-999",
            TONE_DOT?.[tone] ?? TONE_DOT?.[DEFAULT_TONE],
          )}
        />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-body-md text-text-primary">{event?.label}</p>
        <p className="text-body-sm text-text-tertiary">{event?.timestamp}</p>
      </div>
    </li>
  );
}
