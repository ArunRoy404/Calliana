import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * The bordered box a list entry sits in inside a side panel — call logs,
 * tasks, upcoming events (Figma 199:42079) and assigned clients (199:41222).
 *
 * `emphasis` gives the stronger hairline and tighter padding the assigned
 * clients use. Reveals after `revealDelay`.
 */
export default function RowCard({
  as = "li",
  emphasis = false,
  children,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      as={as}
      delay={revealDelay}
      className={cn(
        "flex items-center rounded-4 border border-solid bg-surface-base transition-[border-color,box-shadow] duration-200 ease-out hover:shadow-card",
        emphasis
          ? "gap-4 border-border-strong p-2"
          : "gap-3 border-border-default p-3 hover:border-border-strong",
        className,
      )}
    >
      {children}
    </Reveal>
  );
}
