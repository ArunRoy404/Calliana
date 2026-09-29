import Button from "@/components/atoms/Button";

/**
 * Row action button — Figma 198:22899. `column.actionLabel` is the copy;
 * `onRowAction` receives the row, and `actionProps` pass through to the
 * button (e.g. `notFunctional` until a screen has a backend).
 */
export default function ActionCell({ column, row, onRowAction, actionProps }) {
  return (
    <Button
      variant="outline"
      size="compact"
      onClick={() => onRowAction?.(row, column)}
      {...actionProps}
    >
      {column?.actionLabel}
    </Button>
  );
}
