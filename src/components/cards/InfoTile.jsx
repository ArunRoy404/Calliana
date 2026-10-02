import AppImage from "@/components/atoms/AppImage";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_BORDER, TONE_SURFACE } from "@/lib/tones";

/**
 * A labelled fact on a grey tile — Figma 198:34937 ("Full Name / Laura
 * Alegre"). An optional icon sits in a small white box on the left; the value
 * can be text or a node (a status pill). Reveals after `revealDelay`.
 *
 * - `size` — `md`, or `sm` for a tighter tile with a small-caps label (the
 *   inbox's client info, Figma 167:51527; an appointment's details).
 * - `tone` — tints the tile in a `src/lib/tones.js` tone instead of grey (an
 *   appointment's details, in its event type's colour).
 * - `as` — the root element; `li` inside a `StaggerList`.
 */
const SIZE_CLASSES = {
  md: { root: "p-4", body: "gap-2", label: "text-body-md", value: "text-body-lg" },
  sm: { root: "px-3 py-2", body: "gap-1", label: "text-label-sm", value: "text-body-md" },
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
  const look = SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md;

  return (
    <Reveal
      as={as}
      delay={revealDelay}
      className={cn(
        "flex min-w-0 items-start gap-2 overflow-hidden rounded-4 border border-solid border-border-strong bg-action-secondary",
        look?.root,
        tone && [TONE_SURFACE?.[tone], TONE_BORDER?.[tone]],
        className,
      )}
    >
      {icon && (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-4 border border-solid border-border-strong bg-surface-base">
          <AppImage src={icon?.src} width={icon?.width} height={icon?.height} />
        </span>
      )}

      <div className={cn("flex min-w-0 flex-1 flex-col", look?.body)}>
        <p className={cn("text-text-secondary", look?.label)}>{label}</p>
        <div
          className={cn(
            "flex min-w-0 items-center truncate text-brand-black",
            look?.value,
          )}
        >
          {children}
        </div>
      </div>

      {action && <span className="shrink-0">{action}</span>}
    </Reveal>
  );
}
