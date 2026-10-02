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
 * - `compact` — a tight hairline box (support notes, 202:30954);
 * - `listed` — one row of a list that sits in a single bordered box, ruled
 *   between rows (the dialer's quick contacts, 202:38997);
 * - `flush` — no box and no padding, a rule underneath; its content (a row
 *   `Button`) fills it (inbox conversations, 167:51527);
 * - `accent` / `accent-compact` — a tinted strip with a solid left edge, the
 *   caller adding the tone's surface and outline (calendar events: a day
 *   card's, and the tighter one inside a week or month grid).
 *
 * `style` is for geometry that is data, not a class — a calendar event's
 * `top` / `height` in its hour column. Reveals after `revealDelay`.
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
  listed:
    "gap-3 border-b border-solid border-border-default bg-surface-base px-4 py-3 last:border-b-0 hover:bg-surface-subtle",
  flush: "items-stretch border-b border-solid border-border-default",
  accent: "items-stretch rounded-4 border-l-4 border-solid p-3",
  "accent-compact":
    "min-w-0 items-stretch overflow-hidden rounded-4 border-l-2 border-solid px-2 py-1",
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
