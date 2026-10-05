import { create } from "zustand";

import { cellCount, donutSegments } from "@/lib/charts";
import { fillTemplate } from "@/lib/fillTemplate";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  REPORTS_PARAM_KEYS,
  reportsParamsSchema,
} from "@/schemas/reports/reports-params.schema";

const { period: PERIOD } = REPORTS_PARAM_KEYS;
const defaults = searchParamDefaults(reportsParamsSchema);
const PERCENT = new Intl.NumberFormat("en-US", { style: "percent" });

/** How many cells tall a dot-matrix chart is: its `max` in `step`s. */
function rowsOf(chart) {
  return Math.round((chart?.max ?? 0) / (chart?.step || 1));
}

/** "09:00" for minutes after midnight. */
function clockLabel(minutes) {
  const hours = `${Math.floor(minutes / 60)}`.padStart(2, "0");
  return `${hours}:${`${minutes % 60}`.padStart(2, "0")}`;
}

/**
 * Calls Volume as a dot-matrix chart: one column per two-hour slot of the
 * week, the answered calls in blue over every call in grey, with a readout
 * of calls and missed, axis labels for the days and a table view.
 */
function buildVolumeChart(volume) {
  const rows = rowsOf(volume);
  const columns =
    volume?.days?.flatMap(
      (day) =>
        day?.slots?.map(([calls, answered], index) => {
          const title = fillTemplate(volume?.columnTitleTemplate, {
            day: day?.label,
            slot: volume?.slotLabels?.[index],
          });
          const missed = calls - answered;

          return {
            id: `${day?.id}-${index}`,
            title,
            label: fillTemplate(volume?.columnLabelTemplate, {
              title,
              calls,
              missed,
            }),
            primaryCells: cellCount(answered, volume?.step, rows),
            secondaryCells: cellCount(calls, volume?.step, rows),
            readout: [
              {
                id: "calls",
                label: volume?.tooltip?.calls,
                value: calls,
                tone: "primary",
              },
              {
                id: "missed",
                label: volume?.tooltip?.missed,
                value: missed,
                tone: "error",
              },
            ],
            cells: [title, calls, missed],
          };
        }) ?? [],
    ) ?? [];

  return {
    ...volume,
    rows,
    columns,
    axisLabels: volume?.days?.map((day) => day?.label) ?? [],
    tableRows: columns.map((column) => ({
      id: column?.id,
      cells: column?.cells,
    })),
  };
}

/**
 * Peak Call Hours as a dot-matrix chart: one column per `slotMinutes` slot
 * from `startHour` to `endHour`, the slot's calls in teal over its typical
 * volume in grey, with a readout of the volume, hourly axis labels and a
 * table view.
 */
function buildPeakChart(peak) {
  if (!peak) return null;
  const rows = rowsOf(peak);
  const start = (peak?.startHour ?? 0) * 60;
  const columns =
    peak?.slots?.map(([calls, typical], index) => {
      const title = clockLabel(start + index * (peak?.slotMinutes ?? 60));
      const volume = fillTemplate(peak?.tooltip?.volumeTemplate, {
        count: calls,
      });

      return {
        id: `slot-${index}`,
        title,
        label: fillTemplate(peak?.columnLabelTemplate, { title, volume }),
        primaryCells: cellCount(calls, peak?.step, rows),
        secondaryCells: cellCount(typical, peak?.step, rows),
        readout: [
          {
            id: "volume",
            label: peak?.tooltip?.volume,
            value: volume,
            tone: "primary",
          },
        ],
        cells: [title, calls, typical],
      };
    }) ?? [];
  const hours = Array.from(
    { length: (peak?.endHour ?? 0) - (peak?.startHour ?? 0) + 1 },
    (_, index) => clockLabel(((peak?.startHour ?? 0) + index) * 60),
  );

  return {
    ...peak,
    rows,
    columns,
    axisLabels: hours,
    tableRows: columns.map((column) => ({
      id: column?.id,
      cells: column?.cells,
    })),
  };
}

/**
 * A reports page's store — the admin's Call Activity & Service Reports and
 * the client portal's Reports & Activity are the same machinery over their
 * own data (rule 0). Every chart's shape and every period's figures are
 * built once here, so a reader returns the same object for the same period.
 *
 * The period (`?period=`) lives in the URL (rule 26): `period(params)`,
 * `stats(params)` and `outcomes(params)` read it; `setPeriod` writes it.
 * `data` carries `periods`, `statColumns`, `statCards`, `statValues`,
 * `volume`, `outcomes`, `activity` and, optionally, `peak`.
 */
export function createReportsStore(data) {
  const defaultPeriod = data?.periods?.[0]?.value;
  const periodOf = (params) => params?.[PERIOD] ?? defaultPeriod;

  const statsByPeriod = Object.fromEntries(
    data?.periods?.map((period) => [
      period?.value,
      data?.statCards?.map((card) => ({
        ...card,
        ...data?.statValues?.[period?.value]?.[card?.id],
      })),
    ]) ?? [],
  );

  const outcomes = data?.outcomes;
  const outcomesByPeriod = Object.fromEntries(
    data?.periods?.map((period) => {
      const segments = donutSegments(
        outcomes?.segments,
        outcomes?.values?.[period?.value],
        outcomes?.ring ?? {},
      ).map((segment) => {
        const shareLabel = PERCENT.format(segment?.share ?? 0);
        return {
          ...segment,
          shareLabel,
          readout: [
            {
              id: "calls",
              label: outcomes?.tooltip?.calls,
              value: segment?.value,
              tone: segment?.tone,
            },
            {
              id: "share",
              label: outcomes?.tooltip?.share,
              value: shareLabel,
              tone: segment?.tone,
            },
          ],
        };
      });
      const byId = new Map(segments.map((segment) => [segment?.id, segment]));
      const legend =
        outcomes?.legendOrder?.map((id) => byId.get(id)) ?? segments;

      return [
        period?.value,
        {
          segments,
          legend,
          tableRows: legend.map((item) => ({
            id: item?.id,
            cells: [item?.label, item?.value, item?.shareLabel],
          })),
        },
      ];
    }) ?? [],
  );

  const volume = buildVolumeChart(data?.volume);
  const peak = buildPeakChart(data?.peak);

  return create(() => ({
    content: data,
    paramsSchema: reportsParamsSchema,
    volume,
    peak,

    period: (params) => periodOf(params),
    stats: (params) => statsByPeriod?.[periodOf(params)],
    outcomes: (params) => outcomesByPeriod?.[periodOf(params)],

    setPeriod: (period) => writeUrlParams({ [PERIOD]: period }, { defaults }),
  }));
}
