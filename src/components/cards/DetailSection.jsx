import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A titled block inside a side panel — Figma 198:34932 ("PERSONAL
 * INFORMATION"): an H4 caption ruled off underneath, then the content.
 *
 * `elevated` adds the soft lift the performance sections carry (Figma
 * 202:22821). Reveals after `revealDelay`.
 */
export default function DetailSection({
  title,
  elevated = false,
  children,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "flex flex-col gap-4 bg-surface-base p-2",
        elevated && "shadow-elevation-sm",
        className,
      )}
    >
      <h3 className="text-h4 border-b border-solid border-brand-border pb-4 text-brand-ink-black">
        {title}
      </h3>
      {children}
    </Reveal>
  );
}
