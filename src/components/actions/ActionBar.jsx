import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A row of record actions — Figma 198:34818 (agent: Assign Client, Edit
 * Agent…) and 198:31064 (client: Call Client, Schedule…). `actions` is data:
 * `[{ id, label, variant, icon }]`, each a `Button` with its icon.
 *
 * `buttonProps` apply to every button — `notFunctionalProps(content)` until
 * the actions have a backend. Reveals after `revealDelay`.
 */
export default function ActionBar({
  actions = [],
  buttonProps,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      delay={revealDelay}
      className={cn("flex flex-wrap items-center gap-2 sm:gap-4", className)}
    >
      {actions?.map((action) => (
        <Button key={action?.id} variant={action?.variant} {...buttonProps}>
          <AssetIcon icon={action?.icon} />
          {action?.label}
        </Button>
      ))}
    </Reveal>
  );
}
