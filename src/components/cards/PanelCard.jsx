import StatusDot from "@/components/atoms/StatusDot";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * The card shell every dashboard panel shares — Figma 191:16818.
 * Title, optional leading dot, optional subtitle, optional trailing action.
 *
 * Reveals itself after `revealDelay` seconds. A panel hands the same value to
 * `nestedRevealDelayAt` so its rows follow it in one by one.
 */
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
  const isReport = variant === "report";

  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex flex-col border border-solid border-border-strong bg-surface-base",
        isReport ? "gap-0 overflow-hidden" : "gap-5 p-6",
        className,
      )}
    >
      <header
        className={cn(
          "flex items-start justify-between gap-4",
          isReport
            ? "min-h-[42px] items-center bg-action-primary px-[10px] py-2"
            : "",
        )}
      >
        <div className="flex min-w-0 flex-col gap-2">
          <h2
            className={cn(
              isReport
                ? "text-[16px] font-semibold leading-5 tracking-[0.2px] text-text-on-primary"
                : "text-h4 flex items-center gap-2",
              !isReport &&
                (tone ? TONE_TEXT?.[tone] : "text-text-primary"),
            )}
          >
            {tone && <StatusDot tone={tone} className="size-2.5" />}
            <span className="truncate">{title}</span>
          </h2>

          {subtitle && (
            <p className="text-body-sm text-text-secondary">{subtitle}</p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </header>

      <div className={cn(isReport && "min-h-0 flex-1 p-[10px]")}>
        {children}
      </div>
    </Reveal>
  );
}
