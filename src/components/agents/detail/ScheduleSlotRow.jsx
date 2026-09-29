import StatusBadge from "@/components/atoms/StatusBadge";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { DEFAULT_TONE, TONE_DOT } from "@/lib/tones";

/**
 * One slot in today's schedule — Figma 199:43802: the time, a colour bar for
 * the kind of slot, the title and who it is with, and its state.
 */
export default function ScheduleSlotRow({ slot, revealDelay = 0 }) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex items-center gap-4 border-b border-solid border-surface-subtle p-2 last:border-b-0"
    >
      <p className="text-body-sm w-14 shrink-0 text-text-tertiary">
        {slot?.time}
      </p>
      <span
        aria-hidden
        className={cn(
          "h-8 w-1.5 shrink-0 rounded-999",
          TONE_DOT?.[slot?.tone] ?? TONE_DOT?.[DEFAULT_TONE],
        )}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-label-lg truncate text-text-primary">
          {slot?.title}
        </p>
        <p className="text-body-sm truncate text-text-tertiary">
          {slot?.subtitle}
        </p>
      </div>
      <StatusBadge
        variant="tag"
        label={slot?.status?.label}
        tone={slot?.status?.tone}
      />
    </Reveal>
  );
}
