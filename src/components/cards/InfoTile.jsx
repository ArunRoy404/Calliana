import AppImage from "@/components/atoms/AppImage";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A labelled fact on a grey tile — Figma 198:34937 ("Full Name / Laura
 * Alegre"). An optional icon sits in a small white box on the left; the value
 * can be text or a node (a status pill). Reveals after `revealDelay`.
 */
export default function InfoTile({
  icon,
  label,
  action,
  children,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      delay={revealDelay}
      className={cn(
        "flex min-w-0 items-start gap-2 overflow-hidden rounded-4 border border-solid border-border-strong bg-action-secondary p-4",
        className,
      )}
    >
      {icon && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-4 border border-solid border-border-strong bg-surface-base">
          <AppImage src={icon?.src} width={icon?.width} height={icon?.height} />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-body-md text-text-secondary">{label}</p>
        <div className="text-body-lg flex min-w-0 items-center truncate text-brand-black">
          {children}
        </div>
      </div>

      {action && <span className="shrink-0">{action}</span>}
    </Reveal>
  );
}
