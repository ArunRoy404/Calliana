import TextureLayer from "@/components/decor/TextureLayer";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * The surface a data table sits on — Figma 198:22839: white paper under a
 * faint texture, with an optional toolbar above the table and a footer below.
 *
 * Reveals itself after `revealDelay`; pass the same value to `DataTable` so its
 * rows follow the card in.
 */
export default function TableCard({
  texture,
  toolbar,
  footer,
  children,
  revealDelay = 0,
  className,
}) {
  return (
    <Reveal
      as="section"
      delay={revealDelay}
      className={cn(
        "relative isolate flex min-w-0 flex-col overflow-hidden bg-surface-base",
        className,
      )}
    >
      <TextureLayer src={texture} className="opacity-17" />

      {toolbar}
      {children}
      {footer}
    </Reveal>
  );
}
