import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * A titled group of fields in a form panel — Figma 198:32329 ("ROLE &
 * ACCESS*") and 202:31077 ("BUSINESS INFORMATION*"): a quiet caption, then
 * the fields. Reveals after `revealDelay`.
 */
export default function FormSection({
  title,
  children,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn("flex flex-col gap-6", className)}
    >
      <h3 className="text-body-lg text-text-secondary">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </Reveal>
  );
}
