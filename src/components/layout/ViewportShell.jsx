import { cn } from "@/lib/cn";

/**
 * Full-viewport gradient shell — Figma 43:5040.
 *
 * Exactly one viewport tall (`h-dvh`, so mobile browser chrome is accounted
 * for) and never scrolls the page itself; a child column takes care of
 * overflow. Shared by the auth screens and the not-found page.
 */
export default function ViewportShell({ children, className }) {
  return (
    <div
      className={cn(
        "flex h-dvh justify-center bg-linear-to-b from-action-secondary to-status-info-bg p-4 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
