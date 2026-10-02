import AssetIcon from "@/components/atoms/AssetIcon";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_BORDER, TONE_SURFACE, TONE_TEXT } from "@/lib/tones";

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
 * - `variant="outlined"` — a hairline box with a 16px semibold title, the
 *   call details panel's sections (202:39212).
 * - `icon` leads the title, tinted by `iconTone` (or `tone`).
 * - `tone` tints the whole section — box, rule and title — in a
 *   `src/lib/tones.js` tone (the call's amber "Internal Triage Note").
 *
 * Reveals after `revealDelay`.
 */
const SIZE_CLASSES = { md: "p-2", lg: "p-6" };

const VARIANT_CLASSES = {
  plain: {
    root: "",
    header: "border-brand-border pb-4",
    title: "text-h4",
  },
  outlined: {
    root: "rounded-8 border border-solid border-border-default p-4",
    header: "border-border-default pb-3",
    title: "text-body-lg font-semibold",
  },
};

export default function DetailSection({
  title,
  subtitle,
  action,
  size = "md",
  variant = "plain",
  elevated = false,
  icon,
  iconTone,
  tone,
  children,
  revealDelay = 0,
  className,
}) {
  const hasHeader = title || subtitle || action;
  const look = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.plain;

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex min-w-0 flex-col gap-4 bg-surface-base",
        SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md,
        look?.root,
        tone && [TONE_SURFACE?.[tone], TONE_BORDER?.[tone]],
        elevated && "shadow-elevation-sm",
        className,
      )}
    >
      {hasHeader && (
        <header
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 border-b border-solid",
            look?.header,
            tone && TONE_BORDER?.[tone],
          )}
        >
          {(title || subtitle) && (
            <div className="flex min-w-0 flex-col gap-2">
              {title && (
                <h3
                  className={cn(
                    "flex items-center gap-1.5",
                    look?.title,
                    TONE_TEXT?.[tone] ?? "text-brand-ink-black",
                  )}
                >
                  {icon && (
                    <AssetIcon
                      icon={icon}
                      className={TONE_TEXT?.[iconTone ?? tone]}
                    />
                  )}
                  {title}
                </h3>
              )}
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
