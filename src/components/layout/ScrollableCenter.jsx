import { cn } from "@/lib/cn";

/**
 * Centres a card in a column, and scrolls only that column when the card is
 * taller than the space available — a short window, or a landscape phone.
 *
 * Centring is `m-auto` rather than `items-center`: a flex-centred child that
 * overflows gets its top clipped and becomes unreachable.
 */
export default function ScrollableCenter({ children, className }) {
  return (
    <div
      className={cn(
        "relative flex h-full overflow-y-auto px-4 py-6 sm:px-6",
        className,
      )}
    >
      <div className="m-auto flex w-full max-w-[500px] justify-center">
        {children}
      </div>
    </div>
  );
}
