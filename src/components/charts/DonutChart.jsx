import ChartTooltip from "@/components/charts/ChartTooltip";
import { TONE_STROKE } from "@/lib/tones";

/**
 * A donut — the reports' Calls Outcomes ring. `segments` come from the
 * store, built once by `donutSegments` (`src/lib/charts.js`): each one's
 * dash on a single circle, clockwise from the top, a small gap apart. `ring`
 * is the geometry in its own square (`{ size, radius, width }`).
 *
 * Each segment is focusable and shows its label, count and share on hover
 * or focus (`readout`). The drawing scales with its box — 15rem across,
 * never wider than its panel (rule 34).
 */
export default function DonutChart({ segments = [], ring, label }) {
  const centre = (ring?.size ?? 0) / 2;

  return (
    <svg
      viewBox={`0 0 ${ring?.size} ${ring?.size}`}
      role="img"
      aria-label={label}
      className="aspect-square w-60 max-w-full overflow-visible"
    >
      {segments?.map((segment) => (
        <ChartTooltip
          key={segment?.id}
          title={segment?.label}
          rows={segment?.readout}
        >
          <circle
            cx={centre}
            cy={centre}
            r={ring?.radius}
            fill="none"
            stroke={TONE_STROKE?.[segment?.tone]}
            strokeWidth={ring?.width}
            strokeDasharray={segment?.dashArray}
            strokeDashoffset={segment?.dashOffset}
            tabIndex={0}
            className="cursor-default outline-none transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:opacity-80"
          />
        </ChartTooltip>
      ))}
    </svg>
  );
}
