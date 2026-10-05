import ChartTooltip from "@/components/charts/ChartTooltip";
import { cn } from "@/lib/cn";

/**
 * One column of a dot-matrix chart: `rows` square cells stacked from the
 * baseline — the `primaryCells` in the chart's fill, the `secondaryCells`
 * above them in grey, the rest an empty well. The whole column is the hit
 * target and is focusable, so its readout (`column.title`, `column.readout`)
 * shows on hover or keyboard focus alike; it lifts a touch while hovered.
 */
export default function DotMatrixColumn({ column, rows, fillClass }) {
  const primary = column?.primaryCells ?? 0;
  const secondary = column?.secondaryCells ?? 0;

  return (
    <ChartTooltip title={column?.title} rows={column?.readout}>
      <div
        tabIndex={0}
        aria-label={column?.label}
        className="flex min-w-0 flex-1 cursor-default flex-col-reverse gap-[3px] rounded-4 outline-none transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        {Array.from({ length: rows }, (_, index) => (
          <span
            key={index}
            aria-hidden
            className={cn(
              "h-2.5 w-full shrink-0",
              index < primary
                ? fillClass
                : index < secondary
                  ? "bg-border-strong"
                  : "bg-brand-track",
            )}
          />
        ))}
      </div>
    </ChartTooltip>
  );
}
