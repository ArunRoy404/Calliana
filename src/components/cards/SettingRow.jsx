import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * One row inside a settings `DetailSection` — a label (and optional current
 * value / description) on the left, a control on the right: a `Switch`, or a
 * value plus a "Change" link. Every settings and profile row is this shape,
 * so it lives once here rather than once per section.
 */
export default function SettingRow({
  label,
  description,
  value,
  children,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      delay={revealDelay}
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 py-1.5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-body-lg text-brand-black">{label}</p>
        {description && (
          <p className="text-body-sm text-text-tertiary">{description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {value && <span className="text-body-lg text-text-secondary">{value}</span>}
        {children}
      </div>
    </Reveal>
  );
}
