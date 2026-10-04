import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * The box a list entry sits in — call logs, tasks, upcoming events (Figma
 * 199:42079) and assigned clients (199:41222) in the agent panel; calls and
 * messages (202:30523) on a client's page.
 *
 * `variant`:
 * - `boxed` (default) — a hairline box;
 * - `emphasis` — the stronger hairline and tighter padding assigned clients use;
 * - `ruled` — no box, a padded row with a rule underneath (a client's calls);
 * - `divider` — no box or side padding, a rule underneath (messages, 202:30625);
 * - `rounded` — a softer, roomier box (appointments, 202:30717);
 * - `outlined` — a strong-ruled box (a client's tasks, 202:30805);
 * - `compact` — a tight hairline box (support notes, 202:30954).
 * - `listed` — one row of a single bordered list, ruled off from the next
 *   with a hairline and no rule after the last (the dialer's quick contacts);
 *   the list itself draws the outer box.
 * - `flush` — a hairline under the row and no padding of its own, for a row
 *   that is a single full-bleed button (an inbox conversation).
 * - `accent` — a tinted strip with a 3px rule down its left edge, title over
 *   subtitle (a calendar event). The caller adds the tone's fill and rule
 *   colour (`TONE_SURFACE` / `TONE_OUTLINE`).
 * - `accent-compact` — the same strip sized to its content with a 2px rule,
 *   for an event inside a calendar grid cell or hour slot.
 *
 * `style` is for geometry that comes from data (a week event's `top` and
 * `height` in its hour column) — never for look.
 *
 * Reveals after `revealDelay`.
 */
const VARIANT_CLASSES = {
  boxed:
    "gap-3 rounded-4 border border-solid border-border-default bg-surface-base p-3 hover:border-border-strong hover:shadow-card",
  emphasis:
    "gap-4 rounded-4 border border-solid border-border-strong bg-surface-base p-2 hover:shadow-card",
  ruled: "gap-2 border-b border-solid border-border-strong p-4",
  divider: "items-start gap-2 border-b border-solid border-border-strong pb-3",
  rounded:
    "gap-3 rounded-12 border border-solid border-border-default bg-surface-base p-4 hover:shadow-card",
  outlined:
    "flex-col items-stretch gap-2 rounded-10 border border-solid border-border-strong bg-surface-base p-3 hover:shadow-card",
  compact:
    "flex-col items-stretch gap-2 rounded-8 border border-solid border-border-default bg-surface-base p-2",
  flush: "border-b border-solid border-border-default",
  accent:
    "flex-col items-stretch gap-1 rounded-4 border-l-[3px] border-solid px-3 py-2",
  "accent-compact":
    "w-fit max-w-full flex-col items-start gap-0.5 overflow-hidden rounded-4 border-l-2 border-solid px-2 py-1",
  listed:
    "gap-3 border-b border-solid border-border-default bg-surface-base p-4 last:border-b-0",
};

export default function RowCard({
  as = "li",
  variant = "boxed",
  children,
  revealDelay = 0,
  style,
  className,
}) {
  return (
    <Reveal
      as={as}
      delay={revealDelay}
      style={style}
      className={cn(
        "flex items-center transition-[border-color,box-shadow] duration-200 ease-out",
        VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.boxed,
        className,
      )}
    >
      {children}
    </Reveal>
  );
}
