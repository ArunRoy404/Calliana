/**
 * Two-line cell: a primary value over a small blue secondary one — Figma
 * 198:22875 (agent name over extension). `column.primary` and
 * `column.secondary` name the row fields.
 */
export default function StackCell({ column, row }) {
  return (
    <span className="flex w-full min-w-0 flex-col gap-1">
      <span className="text-body-md truncate text-brand-black">
        {row?.[column?.primary]}
      </span>
      {row?.[column?.secondary] && (
        <span className="text-label-sm truncate text-status-info">
          {row?.[column?.secondary]}
        </span>
      )}
    </span>
  );
}
