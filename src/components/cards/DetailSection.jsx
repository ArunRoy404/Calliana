import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A titled block of detail — Figma 198:34932 ("PERSONAL INFORMATION", in a
 * side panel) and 198:31295 ("CLIENT INFORMATION", on a page): an H4 caption
 * ruled off underneath, then the content.
 *
 * - `subtitle` sits under the title (198:31348, "Latest logged interactions…").
 * - `action` sits at the right of the header (202:30413, "Add Contact"). With
 *   no title, the action fills the header on its own (202:30716, a full-width
 *   "Schedule Appointment").
 * - `size` is `md` in a side panel and `lg` on a page, which has more room.
 * - `elevated` adds the soft lift the agent performance sections carry
 *   (202:22821).
 *
 * Reveals after `revealDelay`.
 */
const SIZE_CLASSES = { md: "p-2", lg: "p-6" };

export default function DetailSection({
  title,
  subtitle,
  action,
  size = "md",
  elevated = false,
  children,
  revealDelay = 0,
  className,
}) {
  const hasHeader = title || subtitle || action;

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex min-w-0 flex-col gap-4 bg-surface-base",
        SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md,
        elevated && "shadow-elevation-sm",
        className,
      )}
    >
      {hasHeader && (
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-solid border-brand-border pb-4">
          {(title || subtitle) && (
            <div className="flex min-w-0 flex-col gap-2">
              {title && <h3 className="text-h4 text-brand-ink-black">{title}</h3>}
              {subtitle && (
                <p className="text-body-md text-text-secondary">{subtitle}</p>
              )}
            </div>
          )}
          {action}
        </header>
      )}
      {children}
    </Reveal>
  );
}
