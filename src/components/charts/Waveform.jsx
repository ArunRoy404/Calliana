import { cn } from "@/lib/cn";

/**
 * A call's audio as a row of vertical bars, centred on one line — the live
 * call's large blue waveform and the small white one in its header.
 * Decorative (`aria-hidden`): the call's duration is read out by its timer.
 *
 * `bars` are heights, 0–1 (the store builds them from the call's loudness);
 * each is a share of the strip's height, set through `style` because it is
 * data geometry (rule 1). The strip clips at its edge rather than squeezing
 * its bars, so a narrow screen shows less of the call, never thinner bars
 * or a sideways scroll.
 *
 * `size`: `md` — 40px, 3px bars (the body); `sm` — 20px, 1px bars (the
 * header). `tone`: `primary` (blue) or `inverse` (white, on the primary
 * band).
 */
const SIZE_CLASSES = {
  md: { strip: "h-10 gap-0.5", bar: "w-[3px]" },
  sm: { strip: "h-5 gap-0.5", bar: "w-px" },
};

const TONE_CLASSES = {
  primary: "bg-action-primary",
  inverse: "bg-text-on-primary",
};

export default function Waveform({
  bars = [],
  size = "md",
  tone = "primary",
  className,
}) {
  const sizes = SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md;

  return (
    <div
      aria-hidden
      className={cn(
        "flex min-w-0 items-center overflow-hidden",
        sizes?.strip,
        className,
      )}
    >
      {bars?.map((height, index) => (
        <span
          key={index}
          className={cn(
            "shrink-0 rounded-999",
            sizes?.bar,
            TONE_CLASSES?.[tone] ?? TONE_CLASSES?.primary,
          )}
          style={{ height: `${Math.round((height ?? 0) * 100)}%` }}
        />
      ))}
    </div>
  );
}
