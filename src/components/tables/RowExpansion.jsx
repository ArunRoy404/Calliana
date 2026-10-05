import MetaLine from "@/components/atoms/MetaLine";

/**
 * What an expanded list row shows beneath it — the client call log's agent
 * note: a primary-blue caption, the note itself, then a quiet hint line
 * ("Read-only call note • Click the row again to collapse"), on the light
 * primary tint. `expand` is the list's data config (`{ field, title, hint,
 * separator }`); the text is the row's own `expand.field`.
 *
 * The table and the card view both draw it, so the two never differ.
 */
export default function RowExpansion({ expand, row }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 bg-surface-selected px-4 py-4">
      <p className="text-label-md font-semibold text-action-primary">
        {expand?.title}
      </p>
      <p className="text-body-md text-brand-black">{row?.[expand?.field]}</p>
      <MetaLine
        size="sm"
        separator={expand?.separator}
        items={expand?.hint}
        className="mt-4"
      />
    </div>
  );
}
