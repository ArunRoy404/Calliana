import AppImage from "@/components/atoms/AppImage";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_BORDER, TONE_SURFACE } from "@/lib/tones";

/**
 * A labelled fact on a grey tile — Figma 198:34937 ("Full Name / Laura
 * Alegre"). An optional icon sits in a small white box on the left; the value
 * can be text or a node (a status pill). Reveals after `revealDelay`.
 *
 * `size="sm"` is the compact tile of a narrow side column — tighter padding,
 * a 12px label over a 14px value (the inbox's client info). `as` sets the
 * root tag — `li` when the tiles are a `StaggerList`'s rows. `tone` tints
 * the tile's fill and hairline (an appointment's details in its event
 * type's green).
 */
const SIZE_CLASSES = {
  md: {
    tile: "p-4",
    body: "gap-2",
    label: "text-body-md",
    value: "text-body-lg",
  },
  sm: {
    tile: "px-3 py-2",
    body: "gap-1",
    label: "text-body-sm",
    value: "text-body-md",
  },
};

export default function InfoTile({
  as = "div",
  icon,
  label,
  action,
  size = "md",
  tone,
  children,
  revealDelay = 0,
  className,
}) {
  const sizes = SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md;

  return (
    <Reveal
      as={as}
      delay={revealDelay}
      className={cn(
        "flex min-w-0 items-start gap-2 overflow-hidden rounded-4 border border-solid border-border-strong bg-action-secondary",
        sizes?.tile,
        TONE_SURFACE?.[tone],
        TONE_BORDER?.[tone],
        className,
      )}
    >
      {icon && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-4 border border-solid border-border-strong bg-surface-base">
          <AppImage src={icon?.src} width={icon?.width} height={icon?.height} />
        </span>
      )}

      <div className={cn("flex min-w-0 flex-1 flex-col", sizes?.body)}>
        <p className={cn(sizes?.label, "text-text-secondary")}>{label}</p>
        <div
          className={cn(
            sizes?.value,
            "flex min-w-0 items-center truncate text-brand-black",
          )}
        >
          {children}
        </div>
      </div>

      {action && <span className="shrink-0">{action}</span>}
    </Reveal>
  );
}
