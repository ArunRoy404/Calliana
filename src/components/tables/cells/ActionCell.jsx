import AssetIcon from "@/components/atoms/AssetIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/cn";

/**
 * A row's actions — Figma 198:22899 ("View Agent") and 198:26134 ("View
 * Account" beside a call button).
 *
 * `column.actions` is `[{ id, label, icon, iconOnly, variant, hrefField,
 * props }]`:
 * - `hrefField` names the row field holding a link, so the action navigates
 *   (a real `<a>`, prefetched) instead of calling back;
 * - otherwise `onRowAction(row, action)` runs;
 * - `iconOnly` draws just the icon, with `label` as its accessible name;
 * - `props` pass straight to the `Button` (e.g. `notFunctional` and its copy).
 *
 * `actionProps` apply to every action. `stretch` (the card view) lets the
 * labelled actions share the card's width while icon-only ones keep theirs.
 */
export default function ActionCell({
  column,
  row,
  onRowAction,
  actionProps,
  stretch = false,
}) {
  return (
    <span className={cn("flex items-stretch gap-2.5", stretch && "w-full")}>
      {column?.actions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant ?? "outline"}
          size="compact"
          href={row?.[action?.hrefField]}
          aria-label={action?.iconOnly ? action?.label : undefined}
          onClick={() => onRowAction?.(row, action)}
          className={cn(stretch && !action?.iconOnly && "flex-1")}
          {...actionProps}
          {...action?.props}
        >
          {action?.icon && <AssetIcon icon={action?.icon} />}
          {!action?.iconOnly && action?.label}
        </Button>
      ))}
    </span>
  );
}
