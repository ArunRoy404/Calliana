import ChartDataTable from "@/components/charts/ChartDataTable";
import DotMatrixColumn from "@/components/charts/DotMatrixColumn";

/**
 * A dot-matrix bar chart — the reports' Calls Volume (blue) and Peak Call
 * Hours (teal): a y-axis of ticks, then one `DotMatrixColumn` per slot,
 * stacking its primary series in the chart's `fill` over a grey second
 * series, with the x-axis labels spread underneath and joined by a
 * separator dot.
 *
 * `chart` comes from a store, built once: `{ rows, ticks, axisLabels,
 * separator, title, tableHeaders, tableRows, columns: [{ id, label, title,
 * primaryCells, secondaryCells, readout }] }`.
 *
 * Narrower than its columns can sit, it scrolls sideways inside its own box
 * (rule 34), clipped vertically so nothing flashes a scrollbar. A
 * screen-reader table carries every value (the dataviz table view).
 */
const FILL_CLASSES = {
  primary: "bg-action-primary",
  accent: "bg-action-accent",
};

export default function DotMatrixChart({ chart, fill = "primary" }) {
  const fillClass = FILL_CLASSES?.[fill] ?? FILL_CLASSES?.primary;

  return (
    <div className="min-w-0 overflow-x-auto overflow-y-hidden">
      <div className="flex min-w-150 gap-3">
        <div className="text-body-md flex shrink-0 flex-col justify-between pb-7 text-right text-text-tertiary">
          {chart?.ticks?.map((tick) => (
            <span key={tick} className="leading-none">
              {tick}
            </span>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex gap-[3px]">
            {chart?.columns?.map((column) => (
              <DotMatrixColumn
                key={column?.id}
                column={column}
                rows={chart?.rows}
                fillClass={fillClass}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="text-body-md flex items-center justify-between text-text-tertiary"
          >
            {chart?.axisLabels?.map((label, index) => (
              <span key={label} className="contents">
                {index > 0 && <span>{chart?.separator}</span>}
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <ChartDataTable
        caption={chart?.title}
        headers={chart?.tableHeaders}
        rows={chart?.tableRows}
      />
    </div>
  );
}
