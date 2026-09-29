import ActionCell from "@/components/tables/cells/ActionCell";
import BadgeCell from "@/components/tables/cells/BadgeCell";
import IconTextCell from "@/components/tables/cells/IconTextCell";
import StackCell from "@/components/tables/cells/StackCell";
import TextCell from "@/components/tables/cells/TextCell";

/**
 * Picks a cell renderer from the column's `type`. A new kind of cell is one
 * file in `cells/` and one entry here; every table gets it at once.
 */
const CELL_COMPONENTS = {
  text: TextCell,
  stack: StackCell,
  badge: BadgeCell,
  "icon-text": IconTextCell,
  action: ActionCell,
};

export default function TableCellContent({ column, ...props }) {
  const Cell = CELL_COMPONENTS?.[column?.type] ?? TextCell;

  return <Cell column={column} {...props} />;
}
