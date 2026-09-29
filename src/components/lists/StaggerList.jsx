import { cn } from "@/lib/cn";
import { nestedRevealDelayAt } from "@/lib/motion";

/**
 * A vertical list whose rows reveal one after another (rule 14) — call logs,
 * tasks, messages, appointments, notes.
 *
 * `children` is a function, `(item, revealDelay) => row`, so each row stays a
 * self-revealing component with its own key; the list hands out the delays
 * after its own `revealDelay`. `className` sets the gap when it differs from
 * the default 16px.
 */
export default function StaggerList({
  items = [],
  revealDelay = 0,
  className,
  children,
}) {
  return (
    <ul className={cn("flex flex-col gap-4", className)}>
      {items?.map((item, index) =>
        children?.(item, nestedRevealDelayAt(revealDelay, index)),
      )}
    </ul>
  );
}
