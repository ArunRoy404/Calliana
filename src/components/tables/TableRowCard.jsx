import CardField from "@/components/cards/CardField";
import Reveal from "@/components/motion/Reveal";
import TableCellContent from "@/components/tables/TableCellContent";

/**
 * One table row as a card — the row's content rearranged for narrow screens.
 *
 * `layout` names which of the table's columns go where (see `card` in a list's
 * data file, e.g. `src/data/admin/agents.data.js`), and every value is drawn
 * by the same cell renderer the table uses, so a badge or a duration looks
 * identical in both views. The action column stretches across the card.
 * Reveals itself after `revealDelay`.
 */
export default function TableRowCard({
  row,
  layout,
  onRowAction,
  actionProps,
  revealDelay = 0,
}) {
  return (
    <Reveal
      as="li"
      delay={revealDelay}
      className="flex min-w-0 flex-col gap-4 border border-solid border-border-default bg-surface-base/90 p-4 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ease-out hover:border-border-strong hover:shadow-card"
    >
      <div className="flex min-w-0 items-start justify-between gap-3">
        <TableCellContent column={layout?.title} row={row} />
        {layout?.status && (
          <TableCellContent column={layout?.status} row={row} />
        )}
      </div>

      {layout?.subtitle && (
        <TableCellContent column={layout?.subtitle} row={row} />
      )}

      {layout?.fields?.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-solid border-border-default pt-4">
          {layout?.fields?.map((column) => (
            <CardField key={column?.id} label={column?.label}>
              <TableCellContent column={column} row={row} />
            </CardField>
          ))}
        </dl>
      )}

      {layout?.action && (
        <TableCellContent
          column={layout?.action}
          row={row}
          onRowAction={onRowAction}
          actionProps={actionProps}
          stretch
        />
      )}
    </Reveal>
  );
}
