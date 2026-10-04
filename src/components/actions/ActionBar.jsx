import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A row of record actions — Figma 198:34818 (agent: Assign Client, Edit
 * Agent…) and 198:31064 (client: Call Client, Schedule…). `actions` is data:
 * `[{ id, label, variant, icon, onClick }]`, each a `Button` with its icon.
 *
 * `buttonProps` (typically `notFunctionalProps(content)`) apply to every
 * action that has no `onClick` of its own; an action with a real `onClick`
 * (the queue detail panel's "Edit Rules", which opens another panel) is
 * wired instead of toasting not-wired-up. Reveals after `revealDelay`.
 *
 * `size` is every button's `Button` size. `layout` is `row` (default, a
 * wrapping row) or `stack` (full-width buttons one above the other — the
 * inbox's contextual actions).
 */
const LAYOUT_CLASSES = {
  row: "flex-wrap items-center gap-2 sm:gap-4",
  stack: "flex-col items-stretch gap-3",
};

export default function ActionBar({
  actions = [],
  buttonProps,
  size,
  layout = "row",
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      delay={revealDelay}
      className={cn(
        "flex",
        LAYOUT_CLASSES?.[layout] ?? LAYOUT_CLASSES?.row,
        className,
      )}
    >
      {actions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant}
          size={size}
          onClick={action?.onClick}
          {...(!action?.onClick ? buttonProps : undefined)}
        >
          <AssetIcon icon={action?.icon} />
          {action?.label}
        </Button>
      ))}
    </Reveal>
  );
}
