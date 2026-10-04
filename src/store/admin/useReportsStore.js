import { create } from "zustand";

import { reportsData } from "@/data/admin/reports.data";
import { cellCount, donutSegments } from "@/lib/charts";
import { searchParamDefaults } from "@/lib/url/searchParams";
import { writeUrlParams } from "@/lib/url/urlState";
import {
  REPORTS_PARAM_KEYS,
  reportsParamsSchema,
} from "@/schemas/reports/reports-params.schema";

const { period: PERIOD } = REPORTS_PARAM_KEYS;
const defaults = searchParamDefaults(reportsParamsSchema);
const DEFAULT_PERIOD = reportsData?.periods?.[0]?.value;
const PERCENT = new Intl.NumberFormat("en-US", { style: "percent" });

/** Each period's stat cards: the fixed card under that period's figures. */
const statsByPeriod = Object.fromEntries(
  reportsData?.periods?.map((period) => [
    period?.value,
    reportsData?.statCards?.map((card) => ({
      ...card,
      ...reportsData?.statValues?.[period?.value]?.[card?.id],
    })),
  ]) ?? [],
);

/**
 * Each period's donut: the ring's segments (clockwise, with their dashes)
 * and the legend's rows, both carrying value and share.
 */
const OUTCOMES = reportsData?.outcomes;
const outcomesByPeriod = Object.fromEntries(
  reportsData?.periods?.map((period) => {
    const segments = donutSegments(
      OUTCOMES?.segments,
      OUTCOMES?.values?.[period?.value],
      OUTCOMES?.ring ?? {},
    ).map((segment) => ({
      ...segment,
      shareLabel: PERCENT.format(segment?.share ?? 0),
    }));
    const byId = new Map(segments.map((segment) => [segment?.id, segment]));

    return [
      period?.value,
      {
        segments,
        legend: OUTCOMES?.legendOrder?.map((id) => byId.get(id)) ?? segments,
      },
    ];
  }) ?? [],
);

/**
 * The week's dot-matrix columns, one per slot: its day and time, its calls
 * and missed counts, and how many cells each stack fills.
 */
const VOLUME = reportsData?.volume;
const volumeRows = Math.round((VOLUME?.max ?? 0) / (VOLUME?.step || 1));
const volumeColumns =
  VOLUME?.days?.flatMap((day) =>
    day?.slots?.map(([calls, answered], index) => ({
      id: `${day?.id}-${index}`,
      day: day?.label,
      slot: VOLUME?.slotLabels?.[index],
      calls,
      missed: calls - answered,
      callCells: cellCount(calls, VOLUME?.step, volumeRows),
      answeredCells: cellCount(answered, VOLUME?.step, volumeRows),
    })) ?? [],
  ) ?? [];
const volumeChart = {
  ...VOLUME,
  rows: volumeRows,
  columns: volumeColumns,
  dayLabels: VOLUME?.days?.map((day) => day?.label) ?? [],
};

/**
 * Call Activity & Service Reports. The period (`?period=`) lives in the URL
 * (rule 26): readers pick that period's prepared figures, `setPeriod`
 * writes it. Every chart's shape is built once above, so a reader returns
 * the same object for the same period.
 */
export const useReportsStore = create(() => ({
  content: reportsData,
  paramsSchema: reportsParamsSchema,
  volume: volumeChart,

  period: (params) => params?.[PERIOD] ?? DEFAULT_PERIOD,
  stats: (params) => statsByPeriod?.[params?.[PERIOD] ?? DEFAULT_PERIOD],
  outcomes: (params) =>
    outcomesByPeriod?.[params?.[PERIOD] ?? DEFAULT_PERIOD],

  setPeriod: (period) => writeUrlParams({ [PERIOD]: period }, { defaults }),
}));
