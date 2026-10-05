import DataTable from "@/components/tables/DataTable";
import TableCardList from "@/components/tables/TableCardList";
import { cn } from "@/lib/cn";

/**
 * A list's two presentations of the same rows (rule 17): the `DataTable` from
 * `xl` up (from `lg` when `content.tableBreakpoint` is `"lg"`), and
 * `TableCardList` cards below it, both laid out by the list's own `content`
 * (`columns`, `card`, `emptyLabel`, `tableClassName`).
 *
 * `TableDirectory` renders it under its toolbar and above its pager; a
 * dashboard panel showing a few recent rows (the client home's inbound
 * calls) renders it on its own — one switch, never a second copy.
 *
 * `expandedId` / `onToggleRow` open a row's `content.expand` beneath it in
 * both views (the client call log's agent note).
 */
export default function TableViews({
  content,
  rows = [],
  onRowAction,
  actionProps,
  expandedId,
  onToggleRow,
  revealDelay = 0,
}) {
  const fromLg = content?.tableBreakpoint === "lg";

  return (
    <>
      <div className={cn("hidden xl:block", fromLg && "lg:block xl:block")}>
        <DataTable
          columns={content?.columns}
          rows={rows}
          emptyLabel={content?.emptyLabel}
          onRowAction={onRowAction}
          actionProps={actionProps}
          expand={content?.expand}
          expandedId={expandedId}
          onToggleRow={onToggleRow}
          revealDelay={revealDelay}
          className={content?.tableClassName}
        />
      </div>

      <TableCardList
        rows={rows}
        layout={content?.card}
        emptyLabel={content?.emptyLabel}
        onRowAction={onRowAction}
        actionProps={actionProps}
        expand={content?.expand}
        expandedId={expandedId}
        onToggleRow={onToggleRow}
        revealDelay={revealDelay}
        className={cn("xl:hidden", fromLg && "lg:hidden xl:hidden")}
      />
    </>
  );
}
