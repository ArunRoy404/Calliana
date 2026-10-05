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
 * - `variant="outlined"` draws the block as its own bordered card with a
 *   smaller semibold title — the call detail panel's sections. It carries its
 *   own padding, so `size` does not apply to it.
 * - `icon` (an `AssetIcon` descriptor) leads the title; `iconTone` colours
 *   just the icon (the call recording's blue equaliser beside a black title).
 * - `variant="card"` is the outlined card with no rule under its title —
 *   the contact details drawer's Contact Context, Quick Actions and Recent
 *   Calls & Appointments. `variant="callout"` is the same card with a small
 *   caps eyebrow for a title ("IMPORTANT INSTRUCTION FOR AGENTS"); give it
 *   a `tone` to tint it.
 * - `tone` tints the title. On an `outlined` section it tints the whole card
 *   too — fill, border and rule (202:39212's amber "Internal Triage Note").
 * - `titleSize="lg"` sets a plain section's title at 28px (`text-h2`) — the
 *   client settings page's "PROFILE", "NOTIFICATION".
 * - `elevated` adds the soft lift the agent performance sections carry
 *   (202:22821).
 *
 * Reveals after `revealDelay`.
 */
const SIZE_CLASSES = { md: "p-2", lg: "p-6" };

const VARIANT_CLASSES = {
  plain: { root: "gap-4", header: "pb-4", title: "text-h4" },
  outlined: {
    root: "gap-3 rounded-8 border border-solid border-border-default p-4",
    header: "pb-3",
    title: "text-body-lg font-semibold",
  },
  card: {
    root: "gap-3 rounded-8 border border-solid border-border-default p-4",
    header: "border-b-0",
    title: "text-body-lg font-semibold",
  },
  callout: {
    root: "gap-2 rounded-8 border border-solid border-border-default p-4",
    header: "border-b-0",
    title: "text-label-sm uppercase",
  },
};

/** A plain section's larger title; `md` keeps the variant's own. */
const TITLE_SIZES = { lg: "text-h2" };

/** Variants drawn as their own bordered card, which a `tone` tints whole. */
const CARD_VARIANTS = new Set(["outlined", "card", "callout"]);

export default function DetailSection({
  title,
  subtitle,
  action,
  icon,
  iconTone,
  tone,
  size = "md",
  titleSize = "md",
  variant = "plain",
  elevated = false,
  children,
  revealDelay = 0,
  className,
}) {
  const hasHeader = title || subtitle || action;
  const variantClasses = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.plain;
  const tintsCard = CARD_VARIANTS.has(variant) && Boolean(tone);

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex min-w-0 flex-col bg-surface-base",
        SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md,
        variantClasses?.root,
        tintsCard && TONE_SURFACE?.[tone],
        tintsCard && TONE_BORDER?.[tone],
        elevated && "shadow-elevation-sm",
        className,
      )}
    >
      {hasHeader && (
        <header
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 border-b border-solid border-brand-border",
            variantClasses?.header,
            tintsCard && TONE_BORDER?.[tone],
          )}
        >
          {(title || subtitle) && (
            <div className="flex min-w-0 flex-col gap-2">
              {title && (
                <h3
                  className={cn(
                    variantClasses?.title,
                    TITLE_SIZES?.[titleSize],
                    icon && "flex items-center gap-2",
                    TONE_TEXT?.[tone] ?? "text-brand-ink-black",
                  )}
                >
                  {icon && (
                    <AssetIcon icon={icon} className={TONE_TEXT?.[iconTone]} />
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
