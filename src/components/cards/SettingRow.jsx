import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * One row inside a settings `DetailSection` — a label (and optional current
 * value / description) on the left, a control on the right: a `Switch`, or a
 * value plus a "Change" link. Every settings and profile row is this shape,
 * so it lives once here rather than once per section. On a narrow screen
 * the label wraps and the control stays at the right of its row.
 *
 * `size="lg"` sets the label and value at 18px in the ink colour — the
 * client settings page's larger rows.
 */
const SIZE_CLASSES = {
  md: { label: "text-body-lg", value: "text-body-lg text-text-secondary" },
  lg: { label: "text-h5", value: "text-h5 text-brand-black" },
};

export default function SettingRow({
  label,
  description,
  value,
  size = "md",
  children,
  revealDelay = 0,
  className,
}) {
  const sizes = SIZE_CLASSES?.[size] ?? SIZE_CLASSES?.md;

  return (
    <Reveal
      delay={revealDelay}
      className={cn(
        "flex items-center justify-between gap-4 py-1.5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className={cn(sizes?.label, "text-brand-black")}>{label}</p>
        {description && (
          <p className="text-body-sm text-text-tertiary">{description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {value && <span className={sizes?.value}>{value}</span>}
        {children}
      </div>
    </Reveal>
  );
}
