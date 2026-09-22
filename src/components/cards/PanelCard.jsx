import StatusDot from "@/components/atoms/StatusDot";
import { cn } from "@/lib/cn";
import { TONE_TEXT } from "@/lib/tones";

/**
 * The card shell every dashboard panel shares — Figma 191:16818.
 * Title, optional leading dot, optional subtitle, optional trailing action.
 */
export default function PanelCard({
  title,
  subtitle,
  tone,
  action,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "flex flex-col gap-5 border border-solid border-border-strong bg-surface-base p-6",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <h2
            className={cn(
              "text-h4 flex items-center gap-2",
              tone ? TONE_TEXT?.[tone] : "text-text-primary",
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

      {children}
    </section>
  );
}
