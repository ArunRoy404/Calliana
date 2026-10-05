import StatusDot from "@/components/atoms/StatusDot";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * The card shell every dashboard panel shares — Figma 191:16818.
 * Title, optional leading dot, optional subtitle, optional trailing action.
 *
 * `variant`:
 * - `default` — a white card, its title and subtitle above the content.
 * - `banded` — the reports' panels: the title (and subtitle) in white on a
 *   primary-blue band across the top, the content on the canvas tint below.
 *   It grows with its content; panels side by side match heights through
 *   their grid, never a fixed height (rule 34).
 *
 * Reveals itself after `revealDelay` seconds. A panel hands the same value to
 * `nestedRevealDelayAt` so its rows follow it in one by one.
 */
const VARIANT_CLASSES = {
  default: {
    root: "gap-5 border-border-strong bg-surface-base p-6",
    header: "items-start",
    heading: "gap-2",
    title: "text-h4 flex items-center gap-2",
    subtitle: "text-body-sm text-text-secondary",
    body: "contents",
  },
  banded: {
    root: "gap-0 overflow-hidden rounded-4 border-border-default bg-surface-canvas",
    header: "items-center bg-action-primary px-4 py-4",
    heading: "gap-1",
    title: "text-h3 text-text-on-primary",
    subtitle: "text-body-md text-text-on-primary/90",
    body: "flex min-h-0 min-w-0 flex-1 flex-col p-4",
  },
};

export default function PanelCard({
  title,
  subtitle,
  tone,
  action,
  children,
  revealDelay = 0,
  className,
  variant = "default",
}) {
  const classes = VARIANT_CLASSES?.[variant] ?? VARIANT_CLASSES?.default;
  const isBanded = variant === "banded";

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex min-w-0 flex-col border border-solid",
        classes?.root,
        className,
      )}
    >
      <header className={cn("flex justify-between gap-4", classes?.header)}>
        <div className={cn("flex min-w-0 flex-col", classes?.heading)}>
          <h2
            className={cn(
              classes?.title,
              !isBanded && (tone ? TONE_TEXT?.[tone] : "text-text-primary"),
            )}
          >
            {tone && <StatusDot tone={tone} className="size-2.5" />}
            <span className="truncate">{title}</span>
          </h2>

          {subtitle && <p className={classes?.subtitle}>{subtitle}</p>}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </header>

      <div className={classes?.body}>{children}</div>
    </Reveal>
  );
}
