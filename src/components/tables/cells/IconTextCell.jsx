import AssetIcon from "@/components/atoms/AssetIcon";
import { cn } from "@/lib/cn";

/**
 * Value led by a small icon — Figma 198:22888 (clock + duration). `column.icon`
 * is a fixed icon for every row (`{ src, width, height }` or `{ lucide, size
 * }`); `column.iconField` instead reads a per-row icon (the calls table's
 * Direction column, incoming vs. outgoing).
 *
 * The icon and value stay together as one group, so the cell's own
 * alignment (`column.align`) places the pair — centred, the icon sits right
 * beside "Incoming" rather than pinned to the cell's left edge.
 * `column.wrap` lets a long value break onto a second line (a task title)
 * instead of being cut off.
 */
export default function IconTextCell({ column, row }) {
  const icon = column?.iconField ? row?.[column?.iconField] : column?.icon;

  return (
    <span className="flex min-w-0 items-center gap-2">
      <AssetIcon icon={icon} className="shrink-0" />
      <span
        className={cn(
          "text-label-md min-w-0 text-brand-black",
          column?.wrap ? "wrap-break-word" : "truncate",
        )}
      >
        {row?.[column?.field]}
      </span>
    </span>
  );
}
