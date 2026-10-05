/**
 * The props that make a list row (a table `<tr>` or a card `<li>`) open and
 * close its expansion — one copy for both views of a list (rule 0).
 *
 * A click toggles, unless it landed on something interactive inside the row
 * (its "Review Call" link or a button), which keeps its own job. The row is
 * focusable and toggles on Enter or Space too, and says whether it is open
 * (`aria-expanded`). A row that cannot expand gets nothing.
 */
const INTERACTIVE = "a, button, input, select, textarea, [role='combobox']";

export function rowToggleProps({ id, canExpand, isExpanded, onToggle }) {
  if (!canExpand) return {};

  return {
    tabIndex: 0,
    "aria-expanded": isExpanded,
    onClick: (event) => {
      if (event?.target?.closest?.(INTERACTIVE)) return;
      onToggle?.(id);
    },
    onKeyDown: (event) => {
      if (event?.target !== event?.currentTarget) return;
      if (event?.key !== "Enter" && event?.key !== " ") return;
      event?.preventDefault?.();
      onToggle?.(id);
    },
  };
}
