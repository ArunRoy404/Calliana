import { cn } from "@/lib/cn";

/**
 * A small filled count — a conversation's unread messages (Figma
 * 167:51527). Renders nothing at zero, so a read conversation carries no
 * empty bubble.
 */
export default function CountBadge({ count, className }) {
  if (!count) return null;

  return (
    <span
      className={cn(
        "text-label-sm inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-999 bg-action-primary px-1.5 text-text-on-primary",
        className,
      )}
    >
      {count}
    </span>
  );
}
