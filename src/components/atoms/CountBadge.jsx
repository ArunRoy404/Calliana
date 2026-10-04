/**
 * A small filled count — an inbox conversation's unread messages. Renders
 * nothing for zero or no count, so a call site never has to check.
 */
export default function CountBadge({ count }) {
  if (!count) return null;

  return (
    <span className="text-label-sm flex h-4 min-w-4 shrink-0 items-center justify-center rounded-999 bg-action-primary px-1 text-text-on-primary">
      {count}
    </span>
  );
}
