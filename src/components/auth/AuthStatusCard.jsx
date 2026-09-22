import AppImage from "@/components/atoms/AppImage";
import { cn } from "@/lib/cn";

/**
 * Wide confirmation card — Figma 43:9431.
 *
 * Used for terminal states in a flow: a badge, a headline, one line of
 * explanation and a single onward action. Wider than the form cards and
 * centre-aligned, so it does not share `AuthCard`.
 *
 * The design sets the headline in Montserrat Bold; it is rendered in Geist
 * here because Geist is the only family in the design system — Montserrat
 * appears on this one heading and nowhere else.
 */
export default function AuthStatusCard({
  icon,
  mark,
  heading,
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "relative flex w-[500px] max-w-full flex-col items-center gap-6 overflow-hidden rounded-16 border border-solid border-border-default bg-surface-base px-10 py-12 shadow-card",
        className,
      )}
    >
      <div className="relative flex size-[72px] shrink-0 items-center justify-center">
        <AppImage
          src={icon?.src}
          width={icon?.width}
          height={icon?.height}
          className="absolute inset-0"
          priority
        />
        <span className="relative text-[32px] leading-none font-bold text-status-success-strong">
          {mark}
        </span>
      </div>

      <div className="flex w-full flex-col items-center gap-3 text-center">
        <h1 className="text-[36px] leading-none font-bold text-text-primary">
          {heading?.title}
        </h1>
        <p className="text-label-lg text-text-secondary">{heading?.subtitle}</p>
      </div>

      {children}
    </div>
  );
}
