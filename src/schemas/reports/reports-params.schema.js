import { z } from "zod";

import { reportsData } from "@/data/admin/reports.data";
import { enumParam } from "@/schemas/url/list-params.schema";

/** The reports page's URL keys. */
export const REPORTS_PARAM_KEYS = { period: "period" };

/**
 * Everything the reports page keeps in its URL — `/admin/reports?period=week`:
 * the period its stat cards and outcomes cover. A stale value falls back to
 * today, the resting state (a bare path).
 */
export const reportsParamsSchema = z.object({
  [REPORTS_PARAM_KEYS.period]: enumParam(
    reportsData?.periods?.map((period) => period?.value),
  ),
});
